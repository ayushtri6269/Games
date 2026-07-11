import QuizGame from "../components/QuizGame";
import { quizGames } from "../data/quizGames";

export default function CompanyOriginQuiz() {
  return <QuizGame game={quizGames.companyOrigin} />;
}
