import { Product } from "@/types/formData.type";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    name,
    email,
    phone,
    phonePermission,
    usageType,
    invoiceRegistration,
    provideRegistrationNumber,
    city,
    product_info,
    additional_notes,
    productsList,
  } = body;

  // Mapping from the English value to the Japanese label for 都道府県
  const cityMapping: { [key: string]: string } = {
    not_selected: "選択してください",
    hokkaido: "北海道",
    aomori: "青森県",
    iwate: "岩手県",
    miyagi: "宮城県",
    akita: "秋田県",
    yamagata: "山形県",
    fukushima: "福島県",
    ibaraki: "茨城県",
    tochigi: "栃木県",
    gunma: "群馬県",
    saitama: "埼玉県",
    chiba: "千葉県",
    tokyo: "東京都",
    kanagawa: "神奈川県",
    niigata: "新潟県",
    toyama: "富山県",
    ishikawa: "石川県",
    fukui: "福井県",
    yamanashi: "山梨県",
    nagano: "長野県",
    gifu: "岐阜県",
    shizuoka: "静岡県",
    aichi: "愛知県",
    mie: "三重県",
    shiga: "滋賀県",
    kyoto: "京都府",
    osaka: "大阪府",
    hyogo: "兵庫県",
    nara: "奈良県",
    wakayama: "和歌山県",
    tottori: "鳥取県",
    shimane: "島根県",
    okayama: "岡山県",
    hiroshima: "広島県",
    yamaguchi: "山口県",
    tokushima: "徳島県",
    kagawa: "香川県",
    ehime: "愛媛県",
    kochi: "高知県",
    fukuoka: "福岡県",
    saga: "佐賀県",
    nagasaki: "長崎県",
    kumamoto: "熊本県",
    ooita: "大分県",
    miyazaki: "宮崎県",
    kagoshima: "鹿児島県",
    okinawa: "沖縄県",
  };

  // Mapping for all product_condition options
  const productConditionMapping: { [key: string]: string } = {
    not_selected: "選択してください",
    unused: "未使用品",
    excellent: "極上美品",
    good: "美品",
    used: "中古なり",
    damaged: "キズ汚れ破損あり",
    junk: "ジャンク",
    scrap: "スクラップ",
  };

  // Convert city to Japanese
  const cityJP = cityMapping[city] || city;

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Helper function to conditionally add non-empty fields
  const addField = (
    label: string,
    value: string | undefined,
    user?: boolean
  ) => {
    if (user === true) {
      return value && value.trim() !== ""
        ? `<li><strong>${label}:</strong> ${value}</li>`
        : "";
    } else {
      return value && value.trim() !== ""
        ? `<p><strong>${label}:</strong> ${value}</p>`
        : "";
    }
  };

  try {
    // Process all product images
    const systemAttachments = productsList.flatMap(
      (product: Product, productIndex: number) =>
        (product.images ?? [])
          .filter((image: string | null): image is string => image !== null) // Remove null values
          .map((image: string, imageIndex: number) => ({
            filename: `product_${productIndex + 1}_attachment_${imageIndex + 1
              }.png`,
            content: Buffer.from(image.split(",")[1], "base64"),
            encoding: "base64",
            cid: `attached-image-${productIndex}-${imageIndex}`,
          }))
    );

    // Email content for system
    const systemEmailContent = `
<h2>新しいお問い合わせが届きました</h2>
${addField("お名前", name)}
${addField("メールアドレス", email)}
${addField("電話番号", phone)}
${addField(
      "電話の許可",
      phonePermission === "allow_phone_call"
        ? "はい"
        : phonePermission === "disallow_phone_call"
          ? "いいえ"
          : ""
    )}
${addField(
      "使用状況",
      usageType === "business"
        ? "事業（個人事業者または法人）"
        : usageType === "personal"
          ? "個人で使用"
          : ""
    )}
${invoiceRegistration && invoiceRegistration !== ""
        ? addField(
          "インボイス登録",
          invoiceRegistration === "registered" ? "はい" : "いいえ"
        )
        : ""
      }
${provideRegistrationNumber && provideRegistrationNumber !== ""
        ? addField(
          "登録番号の提供",
          provideRegistrationNumber === "will_provide" ? "はい" : "いいえ"
        )
        : ""
      }
${addField("都道府県", cityJP)}
${product_info && product_info !== "" ? addField("市区町村", product_info) : ""}
${addField("追加のメモ", additional_notes)}

${productsList
        .map(
          (product: Product, productIndex: number) => `
    <hr>
    <h3>商品 ${productIndex + 1}</h3>
    ${addField("商品の詳細", product.product_details)}
    ${addField(
            "商品の状態",
            productConditionMapping[product.product_condition] ||
            product.product_condition
          )}
    
    ${(product.images ?? []).length
              ? product
                .images!.filter(
                  (image: string | null): image is string => image !== null
                )
                .map(
                  (image: string, imageIndex: number) => `
              <p><strong>添付ファイル ${imageIndex + 1}:</strong> product_${productIndex + 1
                    }_attachment_${imageIndex + 1}.png</p>
              <img src="cid:attached-image-${productIndex}-${imageIndex}" alt="Attachment ${imageIndex + 1
                    }" />
            `
                )
                .join("")
              : "<p>添付ファイルはありません。</p>"
            }
  `
        )
        .join("")}
`;

    await transporter.sendMail({
      from: `"Website Form" <${process.env.SMTP_USER}>`,
      to: `${process.env.SMTP_USER}`,
      subject: `新しいお問い合わせ: ${name}`,
      html: systemEmailContent,
      attachments: systemAttachments,
    });

    // Email content for user
    const userEmailContent = `
      <h2>${name}様</h2>
      <p>お問い合わせいただきましてありがとうございます。<br />
      ハディズです。</p>
      <p>このメールはお問い合わせの受付をお知らせする自動返信メールです。<br />
      お問い合わせいただいた内容につきましては、担当者よりご連絡いたします。<br />
      何かございましたら、お電話でのお問合わせも受け付けております。<br />
      なお、本メールへの返信は受け付けておりませんのでご了承ください。</p>
      <p><strong>お問い合わせ内容:</strong></p>
      <ul>
        ${addField("お名前", name, true)}
        ${addField("メールアドレス", email, true)}
        ${addField("電話番号", phone, true)}
        ${addField("都道府県", cityJP, true)}
        ${product_info &&
      product_info !== "" &&
      addField("市区町村", product_info, true)
      }</li>
        ${productsList
        .map(
          (product: Product, index: number) => `
            <li><strong>商品 ${index + 1} の詳細:</strong> ${product.product_details
            }</li>
            <li><strong>商品の状態:</strong> ${productConditionMapping[product.product_condition] ||
            product.product_condition
            }</li>
          `
        )
        .join("")}
      </ul>
      <p>よろしくお願いいたします。<br /> <br />
      ◇ ◆<strong>　機械工具 高価買取　</strong>◆ ◇<br />
      <strong>有限会社　ハディズ・インターナショナル</strong><br />
      <strong>〒350-1327 埼玉県狭山市笹井1-33-5</strong><br />
      <strong>TEL：</strong>0120-842-881　04-2955-5276<br />
      <strong>FAX：</strong>04-2954-7136<br />
      <a href="https://mac-hadis.com/"><strong>https://mac-hadis.com/</strong></a><br />
      </p>
      `;

    await transporter.sendMail({
      from: `"ハディズ" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "お問い合わせありがとうございます",
      html: userEmailContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Error sending email",
      },
      { status: 500 }
    );
  }
}
