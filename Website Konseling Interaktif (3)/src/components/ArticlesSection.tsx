import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, Heart, Share2, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function ArticlesSection() {
  const articles = [
    {
      id: 1,
      title: '5 Cara Mengatur Waktu Saat Ujian',
      excerpt: 'Tips praktis untuk mengatur waktu belajar dengan efektif tanpa merasa kewalahan',
      readTime: '3 menit',
      category: 'Tips Belajar',
      likes: 124,
      image: '📚',
      featured: true
    },
    {
      id: 2,
      title: 'Kisah Sarah: Mengubah Kecemasan Jadi Motivasi',
      excerpt: 'Bagaimana seorang siswa mengubah kecemasannya menjadi kekuatan untuk meraih prestasi',
      readTime: '5 menit',
      category: 'Story Inspiratif',
      likes: 256,
      image: '🌟',
      featured: true
    },
    {
      id: 3,
      title: 'Teknik Pomodoro untuk Belajar Lebih Efektif',
      excerpt: 'Metode belajar 25 menit fokus + 5 menit istirahat yang terbukti ampuh',
      readTime: '4 menit',
      category: 'Tips Belajar',
      likes: 89,
      image: '⏰',
      featured: false
    },
    {
      id: 4,
      title: 'Mengatasi Blank Saat Ujian',
      excerpt: 'Strategi praktis untuk tetap tenang dan fokus ketika pikiran tiba-tiba kosong',
      readTime: '3 menit',
      category: 'Tips Ujian',
      likes: 178,
      image: '🧠',
      featured: false
    },
    {
      id: 5,
      title: 'Dari Nilai 50 ke 90: Perjalanan Budi',
      excerpt: 'Transformasi akademik yang menginspirasi banyak siswa',
      readTime: '6 menit',
      category: 'Story Inspiratif',
      likes: 312,
      image: '🎯',
      featured: false
    },
    {
      id: 6,
      title: 'Makanan yang Meningkatkan Konsentrasi',
      excerpt: 'Apa yang kamu makan mempengaruhi kemampuan otakmu. Ini dia daftarnya!',
      readTime: '4 menit',
      category: 'Kesehatan',
      likes: 145,
      image: '🥗',
      featured: false
    },
    {
      id: 7,
      title: 'Cara Tidur Berkualitas Sebelum Ujian',
      excerpt: 'Begadang bukan solusi! Ini cara tidur yang benar untuk performa optimal',
      readTime: '3 menit',
      category: 'Kesehatan',
      likes: 198,
      image: '😴',
      featured: false
    },
    {
      id: 8,
      title: 'Growth Mindset: Kunci Sukses Akademik',
      excerpt: 'Mengapa mindset lebih penting dari IQ dalam kesuksesan belajar',
      readTime: '5 menit',
      category: 'Motivasi',
      likes: 267,
      image: '💪',
      featured: false
    }
  ];

  const categories = ['Semua', 'Tips Belajar', 'Story Inspiratif', 'Tips Ujian', 'Kesehatan', 'Motivasi'];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-[#266CA9] to-[#0F2573] text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <BookOpen className="w-8 h-8" />
            Artikel & Story Inspiratif
          </CardTitle>
          <CardDescription className="text-[#ADE1FB]">
            Baca tips belajar dan kisah inspiratif dari teman-teman sebaya
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Categories */}
      <Card className="border-[#266CA9]">
        <CardContent className="pt-6">
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer hover:bg-[#266CA9] hover:text-white border-[#266CA9] transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Articles */}
      <div>
        <h3 className="text-xl mb-4 text-[#0F2573] flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          Artikel Pilihan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.filter(a => a.featured).map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow border-[#ADE1FB] cursor-pointer">
              <CardHeader>
                <div className="text-5xl mb-4">{article.image}</div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-[#266CA9]">{article.category}</Badge>
                  <Badge variant="outline" className="border-[#266CA9]">
                    <Clock className="w-3 h-3 mr-1" />
                    {article.readTime}
                  </Badge>
                </div>
                <CardTitle className="text-xl hover:text-[#266CA9] transition-colors">
                  {article.title}
                </CardTitle>
                <CardDescription>{article.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      {article.likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-[#266CA9] transition-colors">
                      <Share2 className="w-4 h-4" />
                      Bagikan
                    </button>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Baca
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Articles */}
      <div>
        <h3 className="text-xl mb-4 text-blue-900">Semua Artikel</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {articles.filter(a => !a.featured).map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow border-blue-100 cursor-pointer">
              <CardHeader>
                <div className="text-4xl mb-3">{article.image}</div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs border-blue-300">{article.category}</Badge>
                </div>
                <CardTitle className="text-base hover:text-blue-600 transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {article.likes}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📹 Video Inspiratif
          </CardTitle>
          <CardDescription>Tonton cerita motivasi dari siswa-siswa hebat</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                title: 'Cara Aku Mengatasi Kecemasan', 
                duration: '5:32',
                thumbnail: 'https://images.unsplash.com/photo-1740645581682-bc1e8e37b0f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYW54aWV0eSUyMHJlbGllZiUyMGNhbG18ZW58MXx8fHwxNzYxNzg4MjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
              { 
                title: 'Tips Belajar dari Juara Kelas', 
                duration: '8:15',
                thumbnail: 'https://images.unsplash.com/photo-1650525218265-d6fef4ada666?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjZXNzZnVsJTIwc3R1ZGVudCUyMHN0dWR5JTIwdGlwc3xlbnwxfHx8fDE3NjE3ODgyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
              { 
                title: 'Mindfulness untuk Siswa', 
                duration: '6:20',
                thumbnail: 'https://images.unsplash.com/photo-1760774714285-61ff516f86c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwbWluZGZ1bG5lc3MlMjBzdHVkZW50fGVufDF8fHx8MTc2MTc4ODI0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              }
            ].map((video, index) => (
              <div key={index} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative rounded-lg h-32 overflow-hidden mb-3">
                  <ImageWithFallback 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-0 h-0 border-l-8 border-l-purple-600 border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <h4 className="text-sm mb-1">{video.title}</h4>
                <p className="text-xs text-gray-500">{video.duration}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
