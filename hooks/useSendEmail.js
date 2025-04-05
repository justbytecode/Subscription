"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { Resend } from "resend";

const resend = new Resend('re_L1XQeTsV_5B7A3Q1agz6KEraTgH5dt2rz');

function useSendEmail() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const sendEmail = async ({from,to,subject,html}) => {
    if (!resend) {
      throw new Error("Resend API key is not configured");
    }

    try {
      const result = await resend.emails.send({
        from, to, subject, html
      });

      setResponse(result);
      toast.success('RecurX has been informed.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return result;
    } catch (error) {
      setError(error.message || "Failed To Send Email");
      toast.warn('Failed to inform RecurX.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }


  return { sendEmail, loading, error, response };
}


export default useSendEmail;