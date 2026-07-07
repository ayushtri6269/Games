import QuizGame from "../components/QuizGame";
import { quizGames } from "../data/quizGames";

export default function CubeQuiz() {
  return <QuizGame game={quizGames.cube} />;
}
