import { EmailTemplate } from '@/components/shared/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req : Request) {
  try {
    const body = await req.json();
    const { fullName, email, birth_year, type} = body;

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Thankyou for joining Kickstart',
      react: EmailTemplate({ firstName: fullName }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
