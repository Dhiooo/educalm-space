import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Mail, Send, Calendar, Heart, Sparkles } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function LetterToSelf() {
  const [letterContent, setLetterContent] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examSubject, setExamSubject] = useState('');

  const [savedLetters] = useState([
    {
      id: 1,
      subject: 'Ujian Matematika',
      examDate: '2025-11-05',
      preview: 'Hai aku! Jangan lupa kamu udah berjuang keras. Hasil bukan segalanya...',
      createdAt: '2025-10-25',
      delivered: false
    },
    {
      id: 2,
      subject: 'Ujian Fisika',
      examDate: '2025-10-20',
      preview: 'Kamu pasti bisa! Ingat semua usaha yang sudah kamu lakukan...',
      createdAt: '2025-10-15',
      delivered: true
    }
  ]);

  const handleSendLetter = () => {
    if (!letterContent.trim()) {
      toast.error('Tulis surat penyemangat terlebih dahulu');
      return;
    }
    if (!examDate || !examSubject) {
      toast.error('Lengkapi mata pelajaran dan tanggal ujian');
      return;
    }

    const daysUntil = Math.ceil((new Date(examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    toast.success(`Surat berhasil dijadwalkan! 📬`, {
      description: `Akan dikirim ${daysUntil} hari lagi, tepat sebelum ujian ${examSubject}`
    });

    setLetterContent('');
    setExamDate('');
    setExamSubject('');
  };

  const letterTemplates = [
    {
      title: 'Motivasi Percaya Diri',
      content: 'Hai aku di masa depan! Ingat ya, kamu sudah belajar dengan keras. Kamu jauh lebih siap daripada yang kamu kira. Percaya pada dirimu sendiri! 💪'
    },
    {
      title: 'Pengingat Relaks',
      content: 'Halo! Jangan terlalu tegang ya. Tarik napas dalam-dalam, kamu sudah melakukan yang terbaik. Hasil bukan segalanya, proses belajarmu yang penting! 🌟'
    },
    {
      title: 'Afirmasi Positif',
      content: 'Kamu hebat! Kamu pintar! Kamu bisa! Apapun hasilnya nanti, aku bangga sama kamu. Terus semangat! ❤️'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-[#266CA9] to-[#0F2573] text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Mail className="w-8 h-8" />
            Surat untuk Diri Sendiri
          </CardTitle>
          <CardDescription className="text-[#ADE1FB]">
            Tulis pesan penyemangat untuk dirimu yang akan dikirim sebelum ujian
          </CardDescription>
        </CardHeader>
      </Card>

      {/* How It Works */}
      <Card className="bg-gradient-to-r from-[#ADE1FB]/30 to-[#266CA9]/10 border-[#266CA9]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5 text-[#266CA9]" />
            Cara Kerja
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#266CA9] text-white rounded-full flex items-center justify-center mx-auto mb-2">
                1
              </div>
              <p className="text-gray-700">Tulis pesan penyemangat untuk dirimu</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#266CA9] text-white rounded-full flex items-center justify-center mx-auto mb-2">
                2
              </div>
              <p className="text-gray-700">Pilih tanggal dan mata pelajaran ujian</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#266CA9] text-white rounded-full flex items-center justify-center mx-auto mb-2">
                3
              </div>
              <p className="text-gray-700">Surat akan dikirim tepat sebelum ujian dimulai</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Letter Templates */}
      <div>
        <h3 className="text-lg mb-3 text-[#0F2573] flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#266CA9]" />
          Template Surat
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {letterTemplates.map((template, index) => (
            <Card key={index} className="border-[#ADE1FB] hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-sm">{template.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-600 mb-3 line-clamp-3">{template.content}</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setLetterContent(template.content)}
                  className="w-full text-xs border-[#266CA9] text-[#266CA9] hover:bg-[#ADE1FB]/20"
                >
                  Gunakan Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Write Letter */}
      <Card className="border-[#266CA9]">
        <CardHeader>
          <CardTitle>Tulis Surat Penyemangat</CardTitle>
          <CardDescription>Ungkapkan dukungan dan motivasi untuk dirimu sendiri</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="exam-subject">Mata Pelajaran Ujian</Label>
              <Input
                id="exam-subject"
                placeholder="Contoh: Matematika"
                value={examSubject}
                onChange={(e) => setExamSubject(e.target.value)}
                className="border-[#266CA9]"
              />
            </div>
            <div>
              <Label htmlFor="exam-date">Tanggal Ujian</Label>
              <Input
                id="exam-date"
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="border-[#266CA9]"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="letter-content">Isi Surat</Label>
            <Textarea
              id="letter-content"
              placeholder="Hai aku! Aku mau ngingetin...&#10;&#10;Kamu sudah belajar dengan keras...&#10;Jangan lupa untuk...&#10;Apapun hasilnya, aku bangga sama kamu! ❤️"
              value={letterContent}
              onChange={(e) => setLetterContent(e.target.value)}
              className="min-h-[200px] resize-none border-[#266CA9]"
            />
            <p className="text-xs text-gray-500 mt-2">
              Karakter: {letterContent.length} • Saran: 100-300 karakter untuk pesan yang bermakna
            </p>
          </div>

          {examDate && (
            <div className="bg-[#ADE1FB]/20 border border-[#266CA9] rounded-lg p-4 flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#266CA9] mt-0.5" />
              <div className="flex-1 text-sm">
                <p className="text-[#0F2573]">
                  Surat akan dikirim pada: <strong>{new Date(examDate).toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</strong>
                </p>
                <p className="text-[#266CA9] text-xs mt-1">
                  {Math.ceil((new Date(examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} hari lagi
                </p>
              </div>
            </div>
          )}

          <Button onClick={handleSendLetter} className="w-full bg-[#266CA9] hover:bg-[#0F2573]">
            <Send className="w-4 h-4 mr-2" />
            Jadwalkan Pengiriman Surat
          </Button>
        </CardContent>
      </Card>

      {/* Saved Letters */}
      <div>
        <h3 className="text-lg mb-4 text-[#0F2573]">Surat yang Tersimpan</h3>
        <div className="space-y-3">
          {savedLetters.map((letter) => (
            <Card key={letter.id} className={`border-2 ${letter.delivered ? 'border-green-200 bg-green-50' : 'border-[#ADE1FB]'}`}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-sm">Ujian {letter.subject}</h4>
                      {letter.delivered ? (
                        <Badge className="bg-green-600 text-xs">Terkirim</Badge>
                      ) : (
                        <Badge className="bg-[#266CA9] text-xs">Terjadwal</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{letter.preview}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Ujian: {new Date(letter.examDate).toLocaleDateString('id-ID')}
                      </span>
                      {!letter.delivered && (
                        <span className="text-[#266CA9]">
                          {Math.ceil((new Date(letter.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} hari lagi
                        </span>
                      )}
                    </div>
                  </div>
                  <Mail className={`w-5 h-5 ${letter.delivered ? 'text-green-600' : 'text-[#266CA9]'}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tips */}
      <Card className="bg-gradient-to-r from-[#266CA9] to-[#0F2573] text-white border-0">
        <CardHeader>
          <CardTitle className="text-lg">Tips Menulis Surat yang Bermakna</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-[#ADE1FB]">
            <li>• Tulis dengan tulus dan jujur dari hatimu</li>
            <li>• Ingatkan dirimu tentang semua usaha yang sudah dilakukan</li>
            <li>• Berikan afirmasi positif dan motivasi</li>
            <li>• Jangan lupa untuk mengingatkan dirimu untuk relaks</li>
            <li>• Akhiri dengan pesan yang menenangkan</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
