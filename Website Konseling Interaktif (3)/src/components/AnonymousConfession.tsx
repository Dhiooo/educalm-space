import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { MessageCircle, Heart, Send, Sparkles } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function AnonymousConfession() {
  const [newConfession, setNewConfession] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  const moods = [
    { emoji: '😔', label: 'Sedih', value: 'sad' },
    { emoji: '😰', label: 'Cemas', value: 'anxious' },
    { emoji: '😐', label: 'Biasa', value: 'neutral' },
    { emoji: '🙂', label: 'Baik', value: 'good' },
    { emoji: '😊', label: 'Senang', value: 'happy' }
  ];

  const [confessions] = useState([
    {
      id: 1,
      text: 'Aku takut banget sama ujian minggu depan. Rasanya materi terlalu banyak dan aku nggak yakin bisa mengingat semuanya. Ada yang punya tips?',
      mood: '😰',
      replies: 3,
      hearts: 12,
      isFeatured: false
    },
    {
      id: 2,
      text: 'Terima kasih untuk semua dukungan kalian kemarin! Aku berhasil mengatasi kecemasanku dan ujiannya lancar. Kalian luar biasa! ❤️',
      mood: '😊',
      replies: 8,
      hearts: 45,
      isFeatured: true
    },
    {
      id: 3,
      text: 'Kadang aku merasa sendirian dalam perjuangan ini. Tapi ketika baca curhat-curhat di sini, aku sadar aku nggak sendirian. Semangat buat kita semua!',
      mood: '🙂',
      replies: 5,
      hearts: 23,
      isFeatured: false
    }
  ]);

  const handleSubmit = () => {
    if (!newConfession.trim()) {
      toast.error('Tuliskan perasaanmu terlebih dahulu');
      return;
    }
    if (!selectedMood) {
      toast.error('Pilih mood-mu hari ini');
      return;
    }
    
    toast.success('Curhatan berhasil dikirim! Konselor kami akan segera merespons dengan empati.');
    setNewConfession('');
    setSelectedMood('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-[#266CA9] to-[#0F2573] text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <MessageCircle className="w-8 h-8" />
            Ruang Curhat Anonim
          </CardTitle>
          <CardDescription className="text-[#ADE1FB]">
            Ungkapkan perasaanmu tanpa khawatir. Semua curhat bersifat anonim dan akan direspons dengan penuh empati.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Mood Tracker */}
      <Card className="bg-[#ADE1FB]/20 border-[#266CA9]">
        <CardHeader>
          <CardTitle className="text-lg">Bagaimana Perasaanmu Hari Ini?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 justify-center flex-wrap">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                  selectedMood === mood.value
                    ? 'bg-[#266CA9] text-white shadow-lg scale-110'
                    : 'bg-white hover:bg-[#ADE1FB]/30'
                }`}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className="text-sm">{mood.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Confession */}
      <Card className="border-[#266CA9]">
        <CardHeader>
          <CardTitle>Tulis Curhatanmu</CardTitle>
          <CardDescription>Semua identitas akan tetap anonim dan aman</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Tuliskan apa yang kamu rasakan... Jangan khawatir, ini anonim 💙"
            value={newConfession}
            onChange={(e) => setNewConfession(e.target.value)}
            className="min-h-[120px] resize-none border-[#266CA9] focus:border-[#0F2573]"
          />
          <Button 
            onClick={handleSubmit}
            className="w-full bg-[#266CA9] hover:bg-[#0F2573]"
          >
            <Send className="w-4 h-4 mr-2" />
            Kirim Curhat Anonim
          </Button>
        </CardContent>
      </Card>

      {/* Featured Confession */}
      <Card className="border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-600" />
            <CardTitle className="text-yellow-900">Curhat of the Week</CardTitle>
          </div>
          <CardDescription>Curhat inspiratif minggu ini yang menyemangati banyak orang</CardDescription>
        </CardHeader>
        <CardContent>
          {confessions.filter(c => c.isFeatured).map((confession) => (
            <div key={confession.id} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">{confession.mood}</span>
                <p className="flex-1 text-gray-700">{confession.text}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                  {confession.hearts}
                </button>
                <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  {confession.replies} balasan
                </button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Confessions */}
      <div>
        <h3 className="text-xl mb-4 text-[#0F2573]">Curhat Terbaru</h3>
        <div className="space-y-4">
          {confessions.filter(c => !c.isFeatured).map((confession) => (
            <Card key={confession.id} className="hover:shadow-md transition-shadow border-[#ADE1FB]">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">{confession.mood}</span>
                  <p className="flex-1 text-gray-700">{confession.text}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    {confession.hearts}
                  </button>
                  <button className="flex items-center gap-1 hover:text-[#266CA9] transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    {confession.replies} balasan
                  </button>
                  <Badge variant="outline" className="border-[#266CA9] text-[#266CA9]">Anonim</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
