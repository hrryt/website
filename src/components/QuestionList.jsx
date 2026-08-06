export default function QuestionList({ children }) {
  return (
    <li>
      <ol class="question-list">
        {children}
      </ol>
    </li>
  );
}
