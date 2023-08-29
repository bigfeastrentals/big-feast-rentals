import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface FormData {
  email: string;
  endDate: string;
  firstName: string;
  lastName: string;
  location: string;
  message: string;
  startDate: string;
}

export async function POST(request: NextRequest) {
  const body: FormData = await request.json();

  try {
    const data = await resend.emails.send({
      from: "info@bigfeastrentals.com",
      to: ["bigfeastrentals@gmail.com"],
      reply_to: body.email,
      subject: "New Lead from Big Feast Rentals",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                table {
                    border-collapse: collapse;
                    width: 80%;
                    margin: 0 auto;
                }
                th, td {
                    padding: 8px;
                    text-align: left;
                    border: 1px solid #ddd;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <table>
                <tr>
                    <th>Form Field</th>
                    <th>User Input</th>
                </tr>
                <tr>
                    <td>First Name</td>
                    <td>${body.firstName}</td>
                </tr>
                <tr>
                    <td>Last Name</td>
                    <td>${body.lastName}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td><a href="mailto:${body.email}">${body.email}</a></td>
                </tr>
                <tr>
                    <td>Location</td>
                    <td>${body.location}</td>
                </tr>
                <tr>
                    <td>Start Date</td>
                    <td>${body.startDate}</td>
                </tr>
                <tr>
                    <td>End Date</td>
                    <td>${body.endDate}</td>
                </tr>
                <tr>
                    <td>Message</td>
                    <td>${body.message}</td>
                </tr>
            </table>
        </body>
        </html>
      `,
    });

    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
