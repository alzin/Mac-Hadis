import nodemailer from "nodemailer";

// interfaces
import { IMailService, mailInfo } from "../interfaces/IMailService";

export class GmailSender implements IMailService {

    private transporter;
    private userAuth = process.env.SMTP_USER
    private passAuth = process.env.SMTP_PASSWORD

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtpout.secureserver.net",
            port: 465,
            secure: true,
            auth: {
                user: this.userAuth,
                pass: this.passAuth,
            },
        });
    }

    async send({ from, to, subject, template }: mailInfo): Promise<void> {

        await this.transporter.sendMail({
            from,
            to,
            subject,
            html: template.generateHtml(),
            attachments: template.getAttachments(),
        });
    }
}
