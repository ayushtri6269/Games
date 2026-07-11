import QuizGame from "../components/QuizGame";
import { quizGames } from "../data/quizGames";

export default function ScientificNameQuiz() {
  return <QuizGame game={quizGames.scientificName} />;
}
