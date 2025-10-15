import FeedbackForm from '@/features/feedbackForm/FeedbackForm';
import TextContent from '@/features/textContent/TextContent';

export default function Cooperation() {
  return (
    <div>
      <TextContent markdownFile={'/siteTexts/cooperation.md'}></TextContent>
      <div className='mb-10'></div>
      <FeedbackForm />
    </div>
  );
}
