import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { formSchema } from './types/schemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { postFeedback } from './api/postFeedback';

export default function FeedbackForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      message: '',
    },
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );

  const handleRecaptcha = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus('sending');
    try {
      if (!recaptchaToken) {
        setStatus('error');
        console.error('Recaptcha token is missing');
        return;
      }
      await postFeedback(form.getValues('email'), form.getValues('message'));
      setStatus('sent');
      form.reset();
      setRecaptchaToken(null);
    } catch (error) {
      setStatus('error');
      console.log(error);
    }
  };

  return (
    <div>
      {status === 'sent' && (
        <div className="text-primary mt-2">
          Kiitos palautteestasi, vastaamme siihen mahdollisimman pian.
        </div>
      )}
      {status === 'error' && (
        <div className="text-destructive mt-2">
          Tapahtui virhe. Lähetä palautteesi sähköpostilla tai kokeile myöhemmin
          uudestaan.
        </div>
      )}
      {status !== 'sent' && status !== 'error' && (
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sähköposti</FormLabel>
                  <FormControl>
                    <Input
                      name="email"
                      type="email"
                      value={field.value}
                      onChange={field.onChange}
                      required
                      placeholder="nimi@sahkoposti.fi"
                      className="bg-card"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Viesti</FormLabel>
                  <FormControl>
                    <Textarea
                      name="message"
                      value={field.value}
                      onChange={field.onChange}
                      required
                      placeholder="Hei,"
                      rows={4}
                      className="bg-card"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-center">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={handleRecaptcha}
              />
            </div>
            <Button
              type="submit"
              disabled={status === 'sending'}
              className="w-full hover:text-primary"
            >
              {status === 'sending' ? 'Lahetetaan...' : 'Lähetä'}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
