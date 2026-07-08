import QuizGame from "../components/QuizGame";
import { quizGames } from "../data/quizGames";

export default function DiseaseCauseQuiz() {
  return <QuizGame game={quizGames.diseaseCause} />;
}
