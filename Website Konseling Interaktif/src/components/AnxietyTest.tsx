import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Brain, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function AnxietyTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { question: 'Saya kurang tidur karena khawatir akan tugas yang belum selesai' },
    { question: 'Saya khawatir kalau saya belum melakukan yang terbaik di sekolah/kuliah' },
    { question: 'Belajar saya terganggu oleh pikiran-pikiran kegagalan' },
    { question: 'Ketika ujian, saya mengalami kesulitan untuk mengingat apa yang telah saya pelajari' },
    { question: 'Saya cenderung berpikir bahwa saya pasti akan gagal' },
    { question: 'Ketika menghadapi tugas, saya memerlukan beberapa waktu untuk menenangkan diri saya sehingga saya dapat mulai berpikir dengan jernih' },
    { question: 'Pada awal mendapatkan tugas, saya merasa cemas sehingga tidak dapat berpikir jernih' },
    { question: 'Ketika saya berhadapan dengan ujian atau tugas yang sulit, saya merasa kalah sebelum memulai' },
    { question: 'Saya bertanya-tanya apakah teman-teman sekelas saya memiliki prestasi yang lebih baik dari saya' },
    { question: 'Saya cenderung tidak mampu berbuat apa-apa ketika menghadapi ujian atau tugas' },
    { question: 'Selama ujian atau mengerjakan tugas, saya menemukan diri saya memikirkan konsekuensi dari kegagalan' },
    { question: 'Ketika ujian, saya cemas hingga lupa akan materi yang saya sangat kuasai' },
    { question: 'Saya tidak mengerjakan tugas dengan maksimal' },
    { question: 'Pikiran saya menjadi kosong ketika saya merasa tertekan' },
    { question: 'Saya berpikir bahwa saya tidak terlalu cerdas' },
    { question: 'Rasa cemas membuat saya tidak memperhatikan kesalahan/kelalaian' },
    { question: 'Selama ujian, saya merasa bahwa saya tidak mengerjakannya dengan baik' },
    { question: 'Ketika mengerjakan soal ujian atau tugas, saya mengerjakan seadanya' },
    { question: 'Setelah mengerjakan tugas/ujian, saya merasa seharusnya saya bisa mengerjakannya dengan lebih baik' },
    { question: 'Nilai ujian/tugas saya membuat saya yakin kalau saya tidak pintar' },
    { question: 'Saya baru menyadari bahwa saya membuat kesalahan setelah saya selesai mengumpulkan tugas/ujian' },
    { question: 'Setelah menghadapi tugas/ujian yang sulit saya takut untuk melihat nilainya' },
    { question: 'Ketika nilai tugas/ujian saya bagus, itu berarti karena saya beruntung' },
    { question: 'Saya merasa nilai ujian/tugas itu diluar kendali saya' },
    { question: 'Saya cenderung pasrah saat berhadapan dengan tugas/ujian' }
  ];

  const options = [
    { value: 1, label: 'Tidak sesuai' },
    { value: 2, label: 'Cukup Sesuai' },
    { value: 3, label: 'Sesuai' },
    { value: 4, label: 'Sangat sesuai' }
  ];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    const total = answers.reduce((sum, answer) => sum + answer, 0);
    const maxScore = questions.length * 4;
    const percentage = (total / maxScore) * 100;

    if (percentage < 30) {
      return {
        level: 'Rendah',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        icon: <CheckCircle className="w-16 h-16 text-green-600" />,
        message: 'Kecemasanmu tergolong rendah! Kamu sudah mengelola stres dengan baik.',
        suggestions: [
          'Pertahankan rutinitas belajar yang sudah kamu lakukan',
          'Terus jaga pola tidur yang teratur',
          'Bantu teman-teman yang mungkin membutuhkan tips darimu'
        ]
      };
    } else if (percentage < 60) {
      return {
        level: 'Sedang',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        icon: <Info className="w-16 h-16 text-yellow-600" />,
        message: 'Kecemasanmu tergolong sedang — kamu butuh strategi manajemen waktu dan relaksasi!',
        suggestions: [
          'Buat jadwal belajar yang realistis dan konsisten',
          'Luangkan waktu 10-15 menit setiap hari untuk relaksasi',
          'Coba teknik pernapasan 4-7-8 saat merasa cemas',
          'Berbicara dengan teman atau konselor bisa sangat membantu'
        ]
      };
    } else {
      return {
        level: 'Tinggi',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        icon: <AlertCircle className="w-16 h-16 text-red-600" />,
        message: 'Kecemasanmu tergolong tinggi. Jangan khawatir, kami di sini untuk membantumu!',
        suggestions: [
          'Sangat disarankan untuk berbicara dengan konselor',
          'Praktikkan meditasi dan mindfulness setiap hari',
          'Pecah tugas besar menjadi bagian-bagian kecil yang lebih mudah',
          'Jangan ragu untuk meminta bantuan dari guru atau orang tua',
          'Ingat: nilaimu bukan penentu nilai dirimu sebagai manusia'
        ]
      };
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const result = calculateResult();
    return (
      <div className="max-w-3xl mx-auto">
        <Card className={`${result.bgColor} border-2`}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {result.icon}
            </div>
            <CardTitle className="text-3xl">Hasil Tes Kecemasan</CardTitle>
            <CardDescription className={`text-xl ${result.color}`}>
              Tingkat Kecemasan: {result.level}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-lg text-gray-700 text-center">{result.message}</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg mb-4 text-blue-900">Saran untuk Kamu:</h4>
              <ul className="space-y-3">
                {result.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button onClick={resetTest} variant="outline" className="border-blue-600 text-blue-600">
                Ulangi Tes
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Chat dengan Konselor
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-600" />
              Tes Kecemasan
            </CardTitle>
            <span className="text-sm text-gray-500">
              Pertanyaan {currentQuestion + 1} dari {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <h3 className="text-xl text-gray-800">
              {questions[currentQuestion].question}
            </h3>
          </div>

          <RadioGroup 
            value={answers[currentQuestion]?.toString()} 
            onValueChange={(value) => handleAnswer(parseInt(value))}
            className="space-y-3"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors">
                <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer">
                  <span className="mr-2">{option.value}.</span>
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between pt-4">
            <Button 
              onClick={handlePrevious} 
              variant="outline"
              disabled={currentQuestion === 0}
              className="border-blue-600 text-blue-600"
            >
              Sebelumnya
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentQuestion === questions.length - 1 ? 'Lihat Hasil' : 'Selanjutnya'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
