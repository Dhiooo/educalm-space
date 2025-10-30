import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Users, MessageCircle, ThumbsUp, Send } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function CommunityForum() {
  const [newPost, setNewPost] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');

  const posts = [
    {
      id: 1,
      author: 'Rina S.',
      initials: 'RS',
      title: 'Tips Belajar Matematika yang Efektif',
      content: 'Halo teman-teman! Aku mau share nih cara belajar matematika yang bikin aku ngerti lebih cepat. Pertama, aku selalu...',
      likes: 45,
      replies: 12,
      category: 'Tips Belajar',
      timeAgo: '2 jam lalu'
    },
    {
      id: 2,
      author: 'Budi P.',
      initials: 'BP',
      title: 'Ada yang ujian Fisika minggu depan?',
      content: 'Yuk kita diskusi bareng! Aku masih bingung tentang hukum Newton nih. Ada yang bisa bantu jelasin?',
      likes: 23,
      replies: 8,
      category: 'Diskusi',
      timeAgo: '5 jam lalu'
    },
    {
      id: 3,
      author: 'Siti A.',
      initials: 'SA',
      title: 'Motivasi untuk yang lagi down',
      content: 'Buat kalian yang lagi merasa putus asa, ingat: setiap usaha tidak akan sia-sia. Aku dulu juga pernah merasa...',
      likes: 89,
      replies: 24,
      category: 'Motivasi',
      timeAgo: '1 hari lalu'
    },
    {
      id: 4,
      author: 'Andi K.',
      initials: 'AK',
      title: 'Rekomendasi aplikasi belajar gratis',
      content: 'Mau share beberapa aplikasi yang aku pakai dan sangat membantu. Semuanya gratis lho!',
      likes: 67,
      replies: 15,
      category: 'Tips Belajar',
      timeAgo: '1 hari lalu'
    }
  ];

  const handleSubmitPost = () => {
    if (!newPostTitle.trim() || !newPost.trim()) {
      toast.error('Lengkapi judul dan isi postingan');
      return;
    }

    toast.success('Postingan berhasil dipublikasikan! 🎉');
    setNewPost('');
    setNewPostTitle('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-[#266CA9] to-[#0F2573] text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Users className="w-8 h-8" />
            Forum Komunitas "Teman Sebaya"
          </CardTitle>
          <CardDescription className="text-[#ADE1FB]">
            Berbagi tips, pengalaman, dan motivasi dengan siswa lain
          </CardDescription>
        </CardHeader>
      </Card>

      {/* New Post */}
      <Card className="border-[#266CA9]">
        <CardHeader>
          <CardTitle>Buat Postingan Baru</CardTitle>
          <CardDescription>Berbagi tips, pengalaman, atau ajukan pertanyaan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              placeholder="Judul postingan..."
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="border-[#266CA9]"
            />
          </div>
          <Textarea
            placeholder="Tulis sesuatu yang ingin kamu bagikan dengan teman-teman..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="min-h-[100px] resize-none border-[#266CA9]"
          />
          <div className="flex gap-2 flex-wrap">
            {['Tips Belajar', 'Diskusi', 'Motivasi', 'Tanya Jawab', 'Pengalaman'].map((cat) => (
              <Badge key={cat} variant="outline" className="cursor-pointer hover:bg-[#266CA9] hover:text-white border-[#266CA9]">
                {cat}
              </Badge>
            ))}
          </div>
          <Button onClick={handleSubmitPost} className="w-full bg-[#266CA9] hover:bg-[#0F2573]">
            <Send className="w-4 h-4 mr-2" />
            Posting
          </Button>
        </CardContent>
      </Card>

      {/* Filter/Categories */}
      <Card className="bg-[#ADE1FB]/20 border-[#266CA9]">
        <CardContent className="pt-6">
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-[#266CA9] cursor-pointer">Semua</Badge>
            <Badge variant="outline" className="border-[#266CA9] cursor-pointer hover:bg-[#ADE1FB]/30">Tips Belajar</Badge>
            <Badge variant="outline" className="border-[#266CA9] cursor-pointer hover:bg-[#ADE1FB]/30">Diskusi</Badge>
            <Badge variant="outline" className="border-[#266CA9] cursor-pointer hover:bg-[#ADE1FB]/30">Motivasi</Badge>
            <Badge variant="outline" className="border-[#266CA9] cursor-pointer hover:bg-[#ADE1FB]/30">Tanya Jawab</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      <div className="space-y-4">
        <h3 className="text-xl text-[#0F2573]">Postingan Terbaru</h3>
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow border-[#ADE1FB]">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12 bg-[#266CA9]">
                  <AvatarFallback className="text-white">{post.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{post.author}</span>
                    <span className="text-xs text-gray-500">• {post.timeAgo}</span>
                    <Badge variant="outline" className="text-xs border-[#266CA9]">{post.category}</Badge>
                  </div>
                  <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                  <CardDescription className="text-gray-700">{post.content}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <button className="flex items-center gap-2 hover:text-[#266CA9] transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-[#266CA9] transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.replies} balasan</span>
                </button>
                <Button size="sm" variant="ghost" className="ml-auto text-[#266CA9] hover:text-[#0F2573]">
                  Baca Selengkapnya
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Community Guidelines */}
      <Card className="bg-gradient-to-r from-[#ADE1FB]/30 to-[#266CA9]/10 border-[#266CA9]">
        <CardHeader>
          <CardTitle>Panduan Komunitas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ Hormati pendapat dan pengalaman orang lain</li>
            <li>✅ Berikan dukungan dan motivasi positif</li>
            <li>✅ Bagikan tips yang berguna dan terverifikasi</li>
            <li>❌ Jangan melakukan bullying atau body shaming</li>
            <li>❌ Jangan menyebarkan informasi yang salah</li>
            <li>❌ Jangan membagikan informasi pribadi orang lain</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
