import QuizGame from "../components/QuizGame";
import { quizGames } from "../data/quizGames";

export default function WorldCapitalQuiz() {
  return <QuizGame game={quizGames.worldCapital} />;
}
