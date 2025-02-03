
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
            filename: fileName || "attachment",
            content: attachment.split(",")[1],
            encoding: "base64",
          },
        ]
      : [];

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
      <p><strong>都道府県:</strong> ${city}</p>
      <p><strong>商品情報:</strong> ${product_info}</p>
      <p><strong>査定希望商品の詳細:</strong> ${product_details}</p>
      <p><strong>商品の状態:</strong> ${
        product_condition === "scrap"
          ? "スクラップ"
          : product_condition === "used"
          ? "中古"
          : "新品"
      }</p>
      <p><strong>追加のメモ:</strong> ${additional_notes}</p>
      ${
        attachment
          ? `<p><strong>添付ファイル:</strong> ${fileName}</p>`
          : "<p>添付ファイルはありません。</p>"
      }
    `;

    await transporter.sendMail({
      from: `"Website Form" <${process.env.SMTP_USER}>`,
      to: "info@mac-hadis.com",
      subject: `新しいお問い合わせ: ${name}`,
      html: systemEmailContent,
      attachments: systemAttachments,
    });

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
        <li><strong>都道府県:</strong> ${city}</li>
        <li><strong>商品情報:</strong> ${product_info}</li>
        <li><strong>商品の状態:</strong> ${
          product_condition === "scrap"
            ? "スクラップ"
            : product_condition === "used"
            ? "中古"
            : "新品"
        }</li>
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
        message: error instanceof Error ? error.message : "Error sending email",
      },
      { status: 500 }
    );
  }
}
