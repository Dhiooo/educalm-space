import { Brain, MessageCircle, Calendar, Heart, BookOpen, Target, Mail, Users, FileText, HelpCircle, Video, Smile } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface HomepageProps {
  onNavigate: (tab: string) => void;
}

export default function Homepage({ onNavigate }: HomepageProps) {
  const features = [
    {
      icon: <Brain className="w-12 h-12 text-[#266CA9]" />,
      title: 'Tes Kecemasan Akademik',
      description: 'Cek tingkat kecemasanmu dengan kuis interaktif dan dapatkan saran personal',
      tab: 'test',
      color: 'bg-[#ADE1FB]/20 hover:bg-[#ADE1FB]/40'
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-[#0F2573]" />,
      title: 'Ruang Curhat Anonim',
      description: 'Ungkapkan perasaanmu tanpa khawatir. Kami mendengarkan dengan empati',
      tab: 'confession',
      color: 'bg-[#ADE1FB]/20 hover:bg-[#ADE1FB]/40'
    },
    {
      icon: <Calendar className="w-12 h-12 text-[#266CA9]" />,
      title: 'Kalender Ujian & Pengingat',
      description: 'Atur jadwal ujian dan dapatkan pengingat relaksasi otomatis',
      tab: 'calendar',
      color: 'bg-[#ADE1FB]/20 hover:bg-[#ADE1FB]/40'
    },
    {
      icon: <Heart className="w-12 h-12 text-[#0F2573]" />,
      title: 'Zona Tenang',
      description: 'Meditasi, latihan napas, dan mindfulness untuk menenangkan pikiranmu',
      tab: 'mindfulness',
      color: 'bg-[#ADE1FB]/20 hover:bg-[#ADE1FB]/40'
    },
    {
      icon: <FileText className="w-12 h-12 text-[#266CA9]" />,
      title: 'Artikel & Story Inspiratif',
      description: 'Baca tips belajar dan kisah inspiratif dari teman-teman sebaya',
      tab: 'articles',
      color: 'bg-[#ADE1FB]/20 hover:bg-[#ADE1FB]/40'
    },
    {
      icon: <Users className="w-12 h-12 text-[#0F2573]" />,
      title: 'Forum Teman Sebaya',
      description: 'Berbagi pengalaman dan tips dengan siswa lain',
      tab: 'forum',
      color: 'bg-[#ADE1FB]/20 hover:bg-[#ADE1FB]/40'
    },
    {
      icon: <Smile className="w-12 h-12 text-[#266CA9]" />,
      title: 'Mood Journal Harian',
      description: 'Catat perasaanmu setiap hari dan lihat perkembangan emosimu',
      tab: 'journal',
      color: 'bg-[#ADE1FB]/20 hover:bg-[#ADE1FB]/40'
    },
    {
      icon: <Target className="w-12 h-12 text-[#0F2573]" />,
      title: 'Goal Tracker Akademik',
      description: 'Tetapkan target belajar dan pantau progresmu',
      tab: 'goals',
      color: 'bg-[#ADE1FB]/20 hover:bg-[#ADE1FB]/40'
    },
    {
      icon: <Mail className="w-12 h-12 text-[#266CA9]" />,
      title: 'Surat untuk Diri Sendiri',
      description: 'Tulis pesan penyemangat yang akan dikirim sebelum ujian',
      tab: 'letter',
      color: 'bg-[#ADE1FB]/20 hover:bg-[#ADE1FB]/40'
    },
    {
      icon: <Video className="w-12 h-12 text-[#0F2573]" />,
      title: 'Konseling Online',
      description: 'Chat atau video call dengan konselor profesional',
      tab: 'counseling',
      color: 'bg-[#ADE1FB]/20 hover:bg-[#ADE1FB]/40'
    },
    {
      icon: <HelpCircle className="w-12 h-12 text-[#041D56]" />,
      title: 'Bantuan',
      description: 'Punya pertanyaan? Kami siap membantu!',
      tab: 'help',
      color: 'bg-[#ADE1FB]/20 hover:bg-[#ADE1FB]/40'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center bg-gradient-to-r from-[#266CA9] via-[#0F2573] to-[#041D56] rounded-2xl p-12 text-white shadow-xl">
        <Heart className="w-16 h-16 mx-auto mb-4 animate-pulse" />
        <h2 className="text-4xl mb-4">Selamat Datang di EduCalm Space</h2>
        <p className="text-xl text-[#ADE1FB] max-w-2xl mx-auto">
          Tempat aman untuk kesehatan mentalmu. Kami di sini untuk mendukungmu menghadapi tantangan akademik dengan tenang dan percaya diri.
        </p>
        <div className="mt-6 flex gap-4 justify-center flex-wrap">
          <Button onClick={() => onNavigate('test')} className="bg-white text-[#266CA9] hover:bg-[#ADE1FB]/30">
            Mulai Tes Kecemasan
          </Button>
          <Button onClick={() => onNavigate('mindfulness')} className="bg-[#266CA9] hover:bg-[#0F2573]">
            Zona Tenang
          </Button>
        </div>
      </div>

      {/* Quick Mood Tracker */}
      <Card className="bg-gradient-to-r from-[#ADE1FB]/20 to-[#ADE1FB]/40 border-[#266CA9]/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smile className="w-6 h-6 text-[#266CA9]" />
            Bagaimana Perasaanmu Hari Ini?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 justify-center flex-wrap">
            {[
              { emoji: '😔', label: 'Sedih', color: 'hover:bg-[#ADE1FB]/40' },
              { emoji: '😰', label: 'Cemas', color: 'hover:bg-[#ADE1FB]/50' },
              { emoji: '😐', label: 'Biasa Saja', color: 'hover:bg-gray-100' },
              { emoji: '🙂', label: 'Baik', color: 'hover:bg-green-100' },
              { emoji: '😊', label: 'Senang', color: 'hover:bg-yellow-100' }
            ].map((mood) => (
              <button
                key={mood.label}
                onClick={() => onNavigate('journal')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-white ${mood.color} transition-all border-2 border-transparent hover:border-[#266CA9] hover:shadow-md`}
              >
                <span className="text-4xl">{mood.emoji}</span>
                <span className="text-sm text-gray-600">{mood.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div>
        <h3 className="text-2xl mb-6 text-[#0F2573]">Fitur Kami</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`${feature.color} border-2 border-transparent hover:border-[#266CA9] cursor-pointer transition-all hover:shadow-lg`}
              onClick={() => onNavigate(feature.tab)}
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">{feature.icon}</div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription className="text-gray-700">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Motivational Quote */}
      <Card className="bg-gradient-to-r from-[#266CA9] to-[#0F2573] text-white border-0">
        <CardContent className="text-center py-8">
          <p className="text-2xl italic">
            "Kamu lebih kuat dari yang kamu kira. Setiap langkah kecil adalah kemajuan."
          </p>
          <p className="mt-4 text-[#ADE1FB]">- EduCalm Space Team</p>
        </CardContent>
      </Card>
    </div>
  );
}
