import FeedbackForm from '@/features/feedbackForm/FeedbackForm';
import TextContent from '@/features/textContent/TextContent';

export default function Contact() {
  return (
    <div>
      <h2 className="text-2xl mb-4">Anna palautetta</h2>
      <FeedbackForm />
      <div className='my-20' />
      <TextContent markdownFile={'/siteTexts/contact.md'}></TextContent>
    </div>
  );
}
