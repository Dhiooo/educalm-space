import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Video, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { counselorPhotos } from '../assets/images';

export default function OnlineCounseling() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedCounselor, setSelectedCounselor] = useState<number | null>(null);

  const counselors = [
    {
      id: 1,
      name: 'Sephia Uswatun Hasanah Iswadi, M.Psi., Psikolog',
      specialty: 'Psikolog Klinis',
      experience: '5 tahun',
      available: true,
      rating: 4.9,
      sessions: 150,
      initials: 'SU',
      photo: counselorPhotos.sephia
    },
    {
      id: 2,
      name: 'Divka Aulia Kusumawardhani, M.Psi., Psikolog',
      specialty: 'Psikolog Klinis',
      experience: '5 tahun',
      available: true,
      rating: 4.9,
      sessions: 150,
      initials: 'DA',
      photo: counselorPhotos.divka
    },
    {
      id: 3,
      name: 'Haichal Agus Arifin, M.Psi., Psikolog',
      specialty: 'Psikolog Klinis',
      experience: '5 tahun',
      available: true,
      rating: 4.9,
      sessions: 150,
      initials: 'HA',
      photo: counselorPhotos.haichal
    },
    {
      id: 4,
      name: 'Zulvania Fahira Rahmadani, M.Psi., Psikolog',
      specialty: 'Psikolog Klinis',
      experience: '5 tahun',
      available: true,
      rating: 4.9,
      sessions: 150,
      initials: 'ZF',
      photo: counselorPhotos.zulvania
    }
  ];

  const availableTimes = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
  ];

  const handleBooking = () => {
    if (!selectedCounselor || !selectedTime) {
      toast.error('Pilih konselor dan waktu terlebih dahulu');
      return;
    }

    const counselor = counselors.find(c => c.id === selectedCounselor);
    toast.success(`Sesi konseling dengan ${counselor?.name} berhasil dijadwalkan untuk ${selectedTime}!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-[#266CA9] to-[#0F2573] text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Video className="w-8 h-8" />
            Konseling Online
          </CardTitle>
          <CardDescription className="text-[#ADE1FB]">
            Berbicara dengan konselor profesional melalui chat atau video call
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Counselors List */}
      <div>
        <h3 className="text-xl mb-4 text-[#0F2573]">Pilih Konselor</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {counselors.map((counselor) => (
            <Card
              key={counselor.id}
              className={`cursor-pointer transition-all ${
                selectedCounselor === counselor.id
                  ? 'border-2 border-[#266CA9] shadow-lg'
                  : 'border-[#ADE1FB] hover:border-[#266CA9]'
              } ${!counselor.available ? 'opacity-50' : ''}`}
              onClick={() => counselor.available && setSelectedCounselor(counselor.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Avatar className="w-16 h-16 bg-[#266CA9]">
                    {counselor.photo && (
                      <AvatarImage 
                        src={counselor.photo} 
                        alt={counselor.name}
                        className="object-cover"
                        style={{ objectPosition: '50% 50%' }}
                      />
                    )}
                    <AvatarFallback className="text-white text-lg">
                      {counselor.initials}
                    </AvatarFallback>
                  </Avatar>
                  {counselor.available ? (
                    <Badge className="bg-green-500">Tersedia</Badge>
                  ) : (
                    <Badge variant="secondary">Tidak Tersedia</Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{counselor.name}</CardTitle>
                <CardDescription>{counselor.specialty}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Pengalaman: {counselor.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{counselor.sessions} sesi selesai</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span>Rating: {counselor.rating}/5.0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Booking Section */}
      {selectedCounselor && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <Card className="border-[#266CA9]">
            <CardHeader>
              <CardTitle>Pilih Tanggal</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border border-[#266CA9]"
                disabled={(date) => date < new Date()}
              />
            </CardContent>
          </Card>

          {/* Time Selection */}
          <Card className="border-[#266CA9]">
            <CardHeader>
              <CardTitle>Pilih Waktu</CardTitle>
              <CardDescription>
                {selectedDate?.toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    variant={selectedTime === time ? 'default' : 'outline'}
                    className={selectedTime === time ? 'bg-[#266CA9]' : 'border-[#266CA9]'}
                  >
                    {time}
                  </Button>
                ))}
              </div>

              {selectedTime && (
                <div className="mt-6 space-y-4">
                  <div className="bg-[#ADE1FB]/20 border border-[#266CA9] rounded-lg p-4">
                    <h4 className="text-sm mb-2">Detail Booking:</h4>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p>• Konselor: {counselors.find(c => c.id === selectedCounselor)?.name}</p>
                      <p>• Waktu: {selectedTime}</p>
                      <p>• Durasi: 60 menit</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleBooking}
                      className="flex-1 bg-[#266CA9] hover:bg-[#0F2573]"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Book Video Call
                    </Button>
                    <Button
                      onClick={handleBooking}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Book Chat
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Info */}
      <Card className="bg-gradient-to-r from-[#ADE1FB]/30 to-[#266CA9]/10 border-[#266CA9]">
        <CardHeader>
          <CardTitle>Tentang Layanan Konseling</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="mb-2">Apa yang bisa dikonsultasikan?</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Kecemasan akademik</li>
                <li>• Manajemen stress</li>
                <li>• Motivasi belajar</li>
                <li>• Masalah pribadi</li>
                <li>• Perencanaan karir</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2">Keamanan & Privasi</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• 100% rahasia dan aman</li>
                <li>• Konselor bersertifikat</li>
                <li>• Data terenkripsi</li>
                <li>• Tidak ada judgement</li>
                <li>• Gratis untuk siswa</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
