import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import type { Planet } from '@/lib/types';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

function generateQuestions(planet: Planet): QuizQuestion[] {
  const { t } = useTranslation(); //Added useTranslation hook here.
  return [
    {
      question: `${planet.name}${t('quiz.testKnowledge')}`,
      options: [
        `${planet.averageTemp}°C`,
        `${planet.averageTemp + 50}°C`,
        `${planet.averageTemp - 30}°C`,
        `${planet.averageTemp + 100}°C`
      ],
      correctAnswer: 0
    },
    {
      question: `${t('planet.distanceFromSun')} ${planet.name}?`,
      options: [
        `${planet.distanceFromSunKm} ${t('planet.km')}`,
        `${planet.distanceFromSunKm + 1000000} ${t('planet.km')}`,
        `${planet.distanceFromSunKm - 500000} ${t('planet.km')}`,
        `${planet.distanceFromSunKm * 2} ${t('planet.km')}`
      ],
      correctAnswer: 0
    },
    {
      question: `${t('planet.orbitalPeriod')} ${planet.name}?`,
      options: [
        `${planet.orbitalPeriod} ${t('planet.earthDays')}`,
        `${planet.orbitalPeriod + 100} ${t('planet.earthDays')}`,
        `${planet.orbitalPeriod - 50} ${t('planet.earthDays')}`,
        `${planet.orbitalPeriod * 2} ${t('planet.earthDays')}`
      ],
      correctAnswer: 0
    }
  ];
}

interface PlanetQuizProps {
  planet: Planet;
}

export default function PlanetQuiz({ planet }: PlanetQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const { t } = useTranslation();

  const questions = generateQuestions(planet);
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setIsAnswered(false);
  };

  if (showResults) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-purple-400">
            {t('quiz.quizResults')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-xl">
            {t('quiz.youScored')} {score} {t('quiz.outOf')} {questions.length}!
          </p>
          <div className="flex justify-center">
            <Button onClick={resetQuiz} variant="outline">
              {t('quiz.tryAgain')}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-purple-400">
          {t('quiz.testKnowledge')} {planet.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg mb-4">{currentQuestion.question}</p>
        <RadioGroup
          value={selectedAnswer?.toString()}
          onValueChange={(value) => setSelectedAnswer(parseInt(value))}
          className="space-y-2"
        >
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem
                value={index.toString()}
                id={`option-${index}`}
                disabled={isAnswered}
              />
              <Label
                htmlFor={`option-${index}`}
                className={`${
                  isAnswered
                    ? index === currentQuestion.correctAnswer
                      ? 'text-green-500'
                      : index === selectedAnswer
                      ? 'text-red-500'
                      : ''
                    : ''
                }`}
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <div className="flex justify-between mt-4">
          {!isAnswered ? (
            <Button onClick={handleAnswer} disabled={selectedAnswer === null}>
              {t('quiz.submitAnswer')}
            </Button>
          ) : (
            <Button onClick={handleNext}>
              {currentQuestionIndex === questions.length - 1 ? t('quiz.showResults') : t('quiz.nextQuestion')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}