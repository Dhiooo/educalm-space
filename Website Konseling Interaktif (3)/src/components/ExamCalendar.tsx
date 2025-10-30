import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar as CalendarIcon, Bell, Music, Plus, AlertCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

export default function ExamCalendar() {
  const [exams, setExams] = useState([
    {
      id: 1,
      subject: 'Matematika',
      date: '2025-11-05',
      time: '08:00',
      daysUntil: 7,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      subject: 'Bahasa Indonesia',
      date: '2025-11-08',
      time: '10:00',
      daysUntil: 10,
      color: 'bg-green-500'
    },
    {
      id: 3,
      subject: 'Fisika',
      date: '2025-11-02',
      time: '13:00',
      daysUntil: 4,
      color: 'bg-purple-500'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newExam, setNewExam] = useState({
    subject: '',
    date: '',
    time: ''
  });

  const handleAddExam = () => {
    if (!newExam.subject || !newExam.date || !newExam.time) {
      toast.error('Lengkapi semua field terlebih dahulu');
      return;
    }

    toast.success(`Ujian ${newExam.subject} berhasil ditambahkan! Kami akan mengirim pengingat relaksasi.`);
    setShowAddForm(false);
    setNewExam({ subject: '', date: '', time: '' });
  };

  const getReminder = (daysUntil: number, subject: string) => {
    if (daysUntil <= 1) {
      return `Besok ujian ${subject}! Yuk, latihan napas 5 menit biar tenang 🧘`;
    } else if (daysUntil <= 3) {
      return `${daysUntil} hari lagi ujian ${subject}! Jangan lupa istirahat yang cukup 😌`;
    } else if (daysUntil <= 7) {
      return `${daysUntil} hari lagi ujian ${subject}! Yuk, mulai review materi perlahan 📚`;
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-[#266CA9] to-[#0F2573] text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <CalendarIcon className="w-8 h-8" />
            Kalender Ujian & Pengingat Relaksasi
          </CardTitle>
          <CardDescription className="text-[#ADE1FB]">
            Atur jadwal ujianmu dan dapatkan pengingat otomatis untuk relaksasi
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Study Calm Playlist */}
      <Card className="bg-gradient-to-r from-[#ADE1FB]/30 to-[#266CA9]/10 border-[#266CA9]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-6 h-6 text-[#0F2573]" />
            Study Calm Playlist
          </CardTitle>
          <CardDescription>Musik instrumental untuk belajar dengan tenang</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Lo-fi Study Beats', duration: '2:45:30', mood: '🎵' },
              { title: 'Piano Relaxation', duration: '1:30:00', mood: '🎹' },
              { title: 'Nature Sounds', duration: '1:15:45', mood: '🌿' }
            ].map((playlist, index) => (
              <div key={index} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-3xl mb-2">{playlist.mood}</div>
                <h4 className="text-sm mb-1">{playlist.title}</h4>
                <p className="text-xs text-gray-500">{playlist.duration}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Exam Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl text-[#0F2573]">Jadwal Ujian</h3>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#266CA9] hover:bg-[#0F2573]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Ujian
        </Button>
      </div>

      {/* Add Exam Form */}
      {showAddForm && (
        <Card className="border-[#266CA9]">
          <CardHeader>
            <CardTitle>Tambah Jadwal Ujian</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">Mata Pelajaran</Label>
              <Input
                id="subject"
                placeholder="Contoh: Matematika"
                value={newExam.subject}
                onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                className="border-[#266CA9]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Tanggal</Label>
                <Input
                  id="date"
                  type="date"
                  value={newExam.date}
                  onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                  className="border-[#266CA9]"
                />
              </div>
              <div>
                <Label htmlFor="time">Waktu</Label>
                <Input
                  id="time"
                  type="time"
                  value={newExam.time}
                  onChange={(e) => setNewExam({ ...newExam, time: e.target.value })}
                  className="border-[#266CA9]"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddExam} className="flex-1 bg-[#266CA9] hover:bg-[#0F2573]">
                Simpan
              </Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline" className="flex-1 border-[#266CA9] text-[#266CA9]">
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exam List */}
      <div className="space-y-4">
        {exams.sort((a, b) => a.daysUntil - b.daysUntil).map((exam) => {
          const reminder = getReminder(exam.daysUntil, exam.subject);
          return (
            <Card key={exam.id} className="border-[#ADE1FB] hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${exam.color}`}></div>
                      <h4 className="text-lg">{exam.subject}</h4>
                      <Badge variant="outline" className="border-[#266CA9]">
                        {exam.daysUntil} hari lagi
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {new Date(exam.date).toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} • {exam.time}
                    </p>
                  </div>
                  <Bell className="w-5 h-5 text-[#266CA9]" />
                </div>

                {reminder && (
                  <div className="bg-[#ADE1FB]/20 border border-[#266CA9] rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[#266CA9] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#0F2573]">{reminder}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Reminder Settings */}
      <Card className="bg-gradient-to-r from-[#ADE1FB]/30 to-[#266CA9]/10 border-[#266CA9]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#266CA9]" />
            Pengaturan Pengingat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>7 hari sebelum ujian: Pengingat mulai review materi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>3 hari sebelum ujian: Pengingat latihan relaksasi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>1 hari sebelum ujian: Pengingat latihan napas & istirahat</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
