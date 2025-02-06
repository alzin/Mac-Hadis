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
    product_details,
    product_condition,
    additional_notes,
    attachment,
    fileName,
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

  // Convert city and product condition values
  const cityJP = cityMapping[city] || city;
  const productConditionJP =
    productConditionMapping[product_condition] || product_condition;

  const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    const systemAttachments = attachment
      ? [
          {
            filename: `${fileName || "attachment"}.png`,
            content: Buffer.from(attachment.split(",")[1], "base64"),
            cid: "attached-image",
          },
        ]
      : [];

    // Email to system
    const systemEmailContent = `
      <h2>新しいお問い合わせが届きました</h2>
      <p><strong>お名前:</strong> ${name}</p>
      <p><strong>メールアドレス:</strong> ${email}</p>
      <p><strong>電話番号:</strong> ${phone}</p>
      <p><strong>電話の許可:</strong> ${
        phonePermission === "allow_phone_call" ? "はい" : "いいえ"
      }</p>
      <p><strong>使用状況:</strong> ${
        usageType === "business" ? "事業（個人事業者または法人）" : "個人で使用"
      }</p>
      <p><strong>インボイス登録:</strong> ${
        invoiceRegistration === "registered" ? "はい" : "いいえ"
      }</p>
      <p><strong>登録番号の提供:</strong> ${
        provideRegistrationNumber === "will_provide" ? "はい" : "いいえ"
      }</p>
      <p><strong>都道府県:</strong> ${cityJP}</p>
      <p><strong>商品情報:</strong> ${product_info}</p>
      <p><strong>査定希望商品の詳細:</strong> ${product_details}</p>
      <p><strong>商品の状態:</strong> ${productConditionJP}</p>
      <p><strong>追加のメモ:</strong> ${additional_notes}</p>
      ${
        attachment
          ? `<p><strong>添付ファイル:</strong> ${fileName}.png</p><img src="cid:attached-image" alt="Attachment" />`
          : "<p>添付ファイルはありません。</p>"
      }
    `;

    await transporter.sendMail({
      from: `"Website Form" <${process.env.SMTP_USER}>`,
      to: `${process.env.SMTP_USER}`,
      subject: `新しいお問い合わせ: ${name}`,
      html: systemEmailContent,
      attachments: systemAttachments,
    });

    // Email to client
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
        <li><strong>お名前:</strong> ${name}</li>
        <li><strong>メールアドレス:</strong> ${email}</li>
        <li><strong>電話番号:</strong> ${phone}</li>
        <li><strong>都道府県:</strong> ${cityJP}</li>
        <li><strong>商品情報:</strong> ${product_info}</li>
        <li><strong>商品の状態:</strong> ${productConditionJP}</li>
      </ul>
      <p>よろしくお願いいたします。<br />ハディズ</p>
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
        message:
          error instanceof Error ? error.message : "Error sending email",
      },
      { status: 500 }
    );
  }
}
