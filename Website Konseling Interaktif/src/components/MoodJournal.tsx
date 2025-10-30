import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Smile, TrendingUp, Calendar, Lightbulb } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function MoodJournal() {
  const [selectedMood, setSelectedMood] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const moods = [
    { emoji: '😔', label: 'Sedih', value: 'sad', color: 'bg-blue-100' },
    { emoji: '😰', label: 'Cemas', value: 'anxious', color: 'bg-purple-100' },
    { emoji: '😐', label: 'Biasa Saja', value: 'neutral', color: 'bg-gray-100' },
    { emoji: '🙂', label: 'Baik', value: 'good', color: 'bg-green-100' },
    { emoji: '😊', label: 'Senang', value: 'happy', color: 'bg-yellow-100' },
    { emoji: '😄', label: 'Sangat Senang', value: 'very-happy', color: 'bg-orange-100' }
  ];

  const activities = [
    '📚 Belajar', '🎮 Bermain Game', '🎵 Mendengar Musik', '🏃 Olahraga',
    '👥 Berkumpul dengan Teman', '😴 Istirahat', '🎨 Hobi Kreatif', '📱 Media Sosial'
  ];

  const weeklyMoods = [
    { day: 'Sen', mood: '😊', date: '28 Okt' },
    { day: 'Sel', mood: '🙂', date: '29 Okt' },
    { day: 'Rab', mood: '😐', date: '30 Okt' },
    { day: 'Kam', mood: '😰', date: '31 Okt' },
    { day: 'Jum', mood: '😊', date: '1 Nov' },
    { day: 'Sab', mood: '😄', date: '2 Nov' },
    { day: 'Min', mood: '🙂', date: '3 Nov' }
  ];

  const handleToggleActivity = (activity: string) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSaveJournal = () => {
    if (!selectedMood) {
      toast.error('Pilih mood-mu terlebih dahulu');
      return;
    }

    toast.success('Journal berhasil disimpan! 📝');
    setSelectedMood('');
    setJournalEntry('');
    setSelectedActivities([]);
  };

  const getWeeklyAnalysis = () => {
    const positiveCount = weeklyMoods.filter(m => ['😊', '😄', '🙂'].includes(m.mood)).length;
    const percentage = Math.round((positiveCount / weeklyMoods.length) * 100);

    if (percentage >= 70) {
      return {
        message: 'Hebat! Minggu ini mood-mu sangat positif 🌟',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        tips: [
          'Pertahankan hal-hal positif yang sudah kamu lakukan',
          'Terus jaga pola hidup sehat',
          'Bantu teman yang mungkin sedang down'
        ]
      };
    } else if (percentage >= 40) {
      return {
        message: 'Minggu ini ada naik turun mood ya. Itu wajar kok! 💙',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        tips: [
          'Coba identifikasi apa yang membuat mood-mu turun',
          'Luangkan waktu untuk self-care',
          'Berbicara dengan orang yang kamu percaya'
        ]
      };
    } else {
      return {
        message: 'Sepertinya minggu ini cukup berat ya. Kamu tidak sendirian 🤗',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        tips: [
          'Pertimbangkan untuk berbicara dengan konselor',
          'Luangkan waktu untuk aktivitas yang kamu sukai',
          'Jangan terlalu keras pada dirimu sendiri',
          'Ingat: ini hanya sementara, akan ada hari yang lebih baik'
        ]
      };
    }
  };

  const analysis = getWeeklyAnalysis();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-[#266CA9] to-[#0F2573] text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Smile className="w-8 h-8" />
            Mood Journal Harian
          </CardTitle>
          <CardDescription className="text-[#ADE1FB]">
            Catat perasaanmu setiap hari dan lihat perkembangan emosimu
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Weekly Mood Tracker */}
      <Card className="border-[#266CA9]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#266CA9]" />
            Mood Minggu Ini
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weeklyMoods.map((day, index) => (
              <div key={index} className="text-center">
                <div className="bg-[#ADE1FB]/20 rounded-lg p-3 hover:bg-[#ADE1FB]/40 transition-colors">
                  <div className="text-xs text-gray-600 mb-2">{day.day}</div>
                  <div className="text-3xl mb-2">{day.mood}</div>
                  <div className="text-xs text-gray-500">{day.date}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Analysis */}
      <Card className={`${analysis.bgColor} border-2`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${analysis.color}`}>
            <TrendingUp className="w-6 h-6" />
            Analisis Mingguan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className={`text-lg ${analysis.color}`}>{analysis.message}</p>
          
          <div className="bg-white rounded-lg p-4">
            <h4 className="text-sm mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-600" />
              Tips Personal untuk Kamu:
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {analysis.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#266CA9] mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Today's Journal */}
      <Card className="border-[#266CA9]">
        <CardHeader>
          <CardTitle>Catat Mood Hari Ini</CardTitle>
          <CardDescription>
            {new Date().toLocaleDateString('id-ID', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mood Selection */}
          <div>
            <h4 className="text-sm mb-3">Bagaimana perasaanmu hari ini?</h4>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                    selectedMood === mood.value
                      ? 'bg-[#266CA9] text-white shadow-lg scale-110'
                      : `${mood.color} hover:scale-105`
                  }`}
                >
                  <span className="text-3xl">{mood.emoji}</span>
                  <span className="text-xs">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div>
            <h4 className="text-sm mb-3">Apa yang kamu lakukan hari ini?</h4>
            <div className="flex flex-wrap gap-2">
              {activities.map((activity) => (
                <Badge
                  key={activity}
                  variant={selectedActivities.includes(activity) ? 'default' : 'outline'}
                  className={`cursor-pointer ${
                    selectedActivities.includes(activity)
                      ? 'bg-[#266CA9]'
                      : 'border-[#266CA9] hover:bg-[#ADE1FB]/30'
                  }`}
                  onClick={() => handleToggleActivity(activity)}
                >
                  {activity}
                </Badge>
              ))}
            </div>
          </div>

          {/* Journal Entry */}
          <div>
            <h4 className="text-sm mb-3">Ceritakan tentang harimu (opsional)</h4>
            <Textarea
              placeholder="Apa yang terjadi hari ini? Apa yang membuatmu merasa seperti ini?..."
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              className="min-h-[100px] resize-none border-[#266CA9]"
            />
          </div>

          <Button onClick={handleSaveJournal} className="w-full bg-[#266CA9] hover:bg-[#0F2573]">
            Simpan Journal Hari Ini
          </Button>
        </CardContent>
      </Card>

      {/* Mood Graph Preview */}
      <Card className="bg-gradient-to-r from-[#ADE1FB]/30 to-[#266CA9]/10 border-[#266CA9]">
        <CardHeader>
          <CardTitle>Grafik Emosi Bulanan</CardTitle>
          <CardDescription>Coming soon: Visualisasi perubahan mood-mu dalam sebulan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-lg p-8 flex items-center justify-center min-h-[200px]">
            <div className="text-center text-gray-400">
              <TrendingUp className="w-16 h-16 mx-auto mb-4" />
              <p className="text-sm">Terus catat mood-mu untuk melihat grafik perkembangan emosi</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
