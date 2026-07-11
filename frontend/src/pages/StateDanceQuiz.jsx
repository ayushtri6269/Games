import QuizGame from "../components/QuizGame";
import { quizGames } from "../data/quizGames";

export default function StateDanceQuiz() {
  return <QuizGame game={quizGames.stateDance} />;
}
