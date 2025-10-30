import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Target, Plus, CheckCircle, Trophy, Sparkles, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function GoalTracker() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    duration: 'week'
  });

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Belajar Matematika 30 menit setiap hari',
      target: 7,
      completed: 5,
      duration: 'Minggu ini',
      subject: 'Matematika',
      emoji: '📐'
    },
    {
      id: 2,
      title: 'Selesaikan 5 latihan soal Fisika',
      target: 5,
      completed: 3,
      duration: 'Minggu ini',
      subject: 'Fisika',
      emoji: '⚡'
    },
    {
      id: 3,
      title: 'Baca 1 bab buku Bahasa Indonesia',
      target: 1,
      completed: 1,
      duration: 'Hari ini',
      subject: 'Bahasa',
      emoji: '📚'
    }
  ]);

  const handleAddGoal = () => {
    if (!newGoal.title.trim() || !newGoal.target) {
      toast.error('Lengkapi semua field terlebih dahulu');
      return;
    }

    toast.success('Target belajar berhasil ditambahkan! 🎯');
    setShowAddForm(false);
    setNewGoal({ title: '', target: '', duration: 'week' });
  };

  const handleCompleteTask = (goalId: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId && goal.completed < goal.target) {
        const newCompleted = goal.completed + 1;
        
        if (newCompleted === goal.target) {
          toast.success('🎉 Selamat! Kamu telah menyelesaikan target ini!', {
            description: getMotivationalQuote()
          });
        } else {
          toast.success(`Progress updated! ${Math.round((newCompleted / goal.target) * 100)}% selesai 💪`);
        }
        
        return { ...goal, completed: newCompleted };
      }
      return goal;
    }));
  };

  const handleDeleteGoal = (goalId: number) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
    toast.success('Target berhasil dihapus');
  };

  const getMotivationalQuote = () => {
    const quotes = [
      'Kamu luar biasa! Tetap semangat!',
      'Konsistensi adalah kunci kesuksesan!',
      'Setiap langkah kecil adalah kemajuan!',
      'Kamu membuktikan bahwa kamu bisa!',
      'Terus pertahankan momentum ini!',
      'Kamu adalah inspirasi!'
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const weeklyConsistency = 80;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-[#266CA9] to-[#0F2573] text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Target className="w-8 h-8" />
            Goal Tracker Akademik
          </CardTitle>
          <CardDescription className="text-[#ADE1FB]">
            Tetapkan target belajar pribadi dan pantau progresmu
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Weekly Consistency */}
      <Card className="bg-gradient-to-r from-[#ADE1FB]/30 to-[#266CA9]/10 border-[#266CA9]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-[#266CA9]" />
              Konsistensi Minggu Ini
            </CardTitle>
            <Badge className="bg-[#266CA9] text-lg px-4 py-1">
              {weeklyConsistency}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress value={weeklyConsistency} className="h-3" />
          <p className="text-sm text-gray-700">
            Kamu sudah {weeklyConsistency}% konsisten minggu ini! 
            {weeklyConsistency >= 80 ? ' Luar biasa! 🌟' : ' Ayo tingkatkan lagi! 💪'}
          </p>
        </CardContent>
      </Card>

      {/* Add Goal Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl text-[#0F2573]">Target Belajar Aktif</h3>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#266CA9] hover:bg-[#0F2573]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Target
        </Button>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <Card className="border-[#266CA9]">
          <CardHeader>
            <CardTitle>Buat Target Belajar Baru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="goal-title">Target Belajar</Label>
              <Input
                id="goal-title"
                placeholder="Contoh: Belajar Matematika 30 menit setiap hari"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                className="border-[#266CA9]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="goal-target">Jumlah Target</Label>
                <Input
                  id="goal-target"
                  type="number"
                  placeholder="7"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  className="border-[#266CA9]"
                />
              </div>
              <div>
                <Label htmlFor="goal-duration">Durasi</Label>
                <select
                  id="goal-duration"
                  value={newGoal.duration}
                  onChange={(e) => setNewGoal({ ...newGoal, duration: e.target.value })}
                  className="w-full h-10 rounded-md border border-[#266CA9] px-3 text-sm"
                >
                  <option value="day">Hari ini</option>
                  <option value="week">Minggu ini</option>
                  <option value="month">Bulan ini</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddGoal} className="flex-1 bg-[#266CA9] hover:bg-[#0F2573]">
                Simpan Target
              </Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline" className="flex-1 border-[#266CA9] text-[#266CA9]">
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = Math.round((goal.completed / goal.target) * 100);
          const isCompleted = goal.completed === goal.target;

          return (
            <Card 
              key={goal.id} 
              className={`border-2 transition-all ${
                isCompleted 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-blue-100 hover:shadow-md'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{goal.emoji}</span>
                      <div className="flex-1">
                        <CardTitle className={`text-lg ${isCompleted ? 'text-green-700 line-through' : ''}`}>
                          {goal.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs border-teal-300">
                            {goal.duration}
                          </Badge>
                          <span className="text-xs">
                            {goal.completed} / {goal.target} selesai
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className={`${isCompleted ? 'text-green-600' : 'text-blue-600'}`}>
                      {progress}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {isCompleted ? (
                  <div className="bg-green-100 border border-green-300 rounded-lg p-4 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm text-green-800">Target tercapai!</p>
                      <p className="text-xs text-green-600 mt-1">{getMotivationalQuote()}</p>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => handleCompleteTask(goal.id)}
                    className="w-full bg-teal-600 hover:bg-teal-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Tandai 1 Sesi Selesai
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Achievements */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Pencapaian Minggu Ini
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🏆', label: 'Target Selesai', value: '3' },
              { icon: '🔥', label: 'Streak Harian', value: '5 hari' },
              { icon: '⭐', label: 'Poin', value: '125' },
              { icon: '🎯', label: 'Konsistensi', value: '80%' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/20 rounded-lg p-4 text-center backdrop-blur">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl mb-1">{stat.value}</div>
                <div className="text-xs text-purple-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Motivational Reminder */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-gray-700 italic">
              "Kesuksesan adalah hasil dari konsistensi kecil yang dilakukan setiap hari"
            </p>
            <p className="text-xs text-gray-500 mt-2">Tetap semangat! 💙</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
