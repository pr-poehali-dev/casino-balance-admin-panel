import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  balance: number;
  email: string;
  status: 'active' | 'banned' | 'inactive';
  lastActivity: string;
}

interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win';
  amount: number;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

const Index = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '333957981',
      name: 'Gia Real',
      balance: 250000,
      email: 'gia.real@casino.com',
      status: 'active',
      lastActivity: '1 мин назад',
    },
    {
      id: '1',
      name: 'Александр Петров',
      balance: 74000,
      email: 'alex@example.com',
      status: 'active',
      lastActivity: '2 мин назад',
    },
    {
      id: '2',
      name: 'Мария Иванова',
      balance: 125000,
      email: 'maria@example.com',
      status: 'active',
      lastActivity: '15 мин назад',
    },
    {
      id: '3',
      name: 'Дмитрий Сидоров',
      balance: 45000,
      email: 'dmitry@example.com',
      status: 'inactive',
      lastActivity: '2 часа назад',
    },
    {
      id: '4',
      name: 'Елена Козлова',
      balance: 89000,
      email: 'elena@example.com',
      status: 'active',
      lastActivity: '5 мин назад',
    },
    {
      id: '5',
      name: 'Игорь Волков',
      balance: 156000,
      email: 'igor@example.com',
      status: 'active',
      lastActivity: '3 мин назад',
    },
    {
      id: '6',
      name: 'Анна Смирнова',
      balance: 98000,
      email: 'anna@example.com',
      status: 'active',
      lastActivity: '10 мин назад',
    },
    {
      id: '7',
      name: 'Сергей Новиков',
      balance: 67000,
      email: 'sergey@example.com',
      status: 'inactive',
      lastActivity: '1 час назад',
    },
    {
      id: '8',
      name: 'Ольга Павлова',
      balance: 189000,
      email: 'olga@example.com',
      status: 'active',
      lastActivity: '7 мин назад',
    },
    {
      id: '9',
      name: 'Максим Федоров',
      balance: 234000,
      email: 'maxim@example.com',
      status: 'active',
      lastActivity: '4 мин назад',
    },
    {
      id: '10',
      name: 'Виктория Морозова',
      balance: 112000,
      email: 'victoria@example.com',
      status: 'active',
      lastActivity: '20 мин назад',
    },
    {
      id: '11',
      name: 'Артем Соколов',
      balance: 78000,
      email: 'artem@example.com',
      status: 'banned',
      lastActivity: '3 дня назад',
    },
    {
      id: '12',
      name: 'Татьяна Лебедева',
      balance: 145000,
      email: 'tatiana@example.com',
      status: 'active',
      lastActivity: '12 мин назад',
    },
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      userId: '333957981',
      userName: 'Gia Real',
      type: 'win',
      amount: 75000,
      timestamp: '11:20',
      status: 'completed',
    },
    {
      id: '2',
      userId: '1',
      userName: 'Александр Петров',
      type: 'deposit',
      amount: 50000,
      timestamp: '10:45',
      status: 'completed',
    },
    {
      id: '3',
      userId: '2',
      userName: 'Мария Иванова',
      type: 'win',
      amount: 25000,
      timestamp: '10:30',
      status: 'completed',
    },
    {
      id: '4',
      userId: '3',
      userName: 'Дмитрий Сидоров',
      type: 'bet',
      amount: -5000,
      timestamp: '10:15',
      status: 'completed',
    },
    {
      id: '5',
      userId: '4',
      userName: 'Елена Козлова',
      type: 'withdrawal',
      amount: -10000,
      timestamp: '10:00',
      status: 'pending',
    },
    {
      id: '6',
      userId: '5',
      userName: 'Игорь Волков',
      type: 'deposit',
      amount: 100000,
      timestamp: '09:45',
      status: 'completed',
    },
    {
      id: '7',
      userId: '333957981',
      userName: 'Gia Real',
      type: 'bet',
      amount: -20000,
      timestamp: '09:30',
      status: 'completed',
    },
    {
      id: '8',
      userId: '8',
      userName: 'Ольга Павлова',
      type: 'win',
      amount: 45000,
      timestamp: '09:15',
      status: 'completed',
    },
    {
      id: '9',
      userId: '9',
      userName: 'Максим Федоров',
      type: 'deposit',
      amount: 80000,
      timestamp: '09:00',
      status: 'completed',
    },
    {
      id: '10',
      userId: '6',
      userName: 'Анна Смирнова',
      type: 'bet',
      amount: -15000,
      timestamp: '08:45',
      status: 'completed',
    },
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [balanceAmount, setBalanceAmount] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const totalBalance = users.reduce((sum, user) => sum + user.balance, 0);
  const activeUsers = users.filter((u) => u.status === 'active').length;
  const todayTransactions = transactions.length;

  const handleBalanceUpdate = (userId: string, amount: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, balance: user.balance + amount } : user
      )
    );
    toast.success(`Баланс обновлен: ${amount > 0 ? '+' : ''}${amount.toLocaleString('ru-RU')} ₽`);
    setDialogOpen(false);
    setBalanceAmount('');
  };

  const getStatusBadge = (status: User['status']) => {
    const variants = {
      active: 'default',
      banned: 'destructive',
      inactive: 'secondary',
    } as const;
    
    const labels = {
      active: 'Активен',
      banned: 'Заблокирован',
      inactive: 'Неактивен',
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const getTransactionIcon = (type: Transaction['type']) => {
    const icons = {
      deposit: 'ArrowDownToLine',
      withdrawal: 'ArrowUpFromLine',
      bet: 'Dices',
      win: 'Trophy',
    };
    return icons[type];
  };

  const getTransactionColor = (type: Transaction['type']) => {
    const colors = {
      deposit: 'text-green-500',
      withdrawal: 'text-red-500',
      bet: 'text-orange-500',
      win: 'text-yellow-500',
    };
    return colors[type];
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Casino Admin</h1>
            <p className="text-muted-foreground mt-1">Панель управления</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <Button variant="outline" size="icon">
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Общий баланс</CardTitle>
              <Icon name="Wallet" className="text-muted-foreground" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalBalance.toLocaleString('ru-RU')} ₽</div>
              <p className="text-xs text-muted-foreground mt-1">+12.5% от вчера</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Активные игроки</CardTitle>
              <Icon name="Users" className="text-muted-foreground" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">Онлайн сейчас</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Транзакции</CardTitle>
              <Icon name="ArrowRightLeft" className="text-muted-foreground" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{todayTransactions}</div>
              <p className="text-xs text-muted-foreground mt-1">За последний час</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Выигрыши</CardTitle>
              <Icon name="TrendingUp" className="text-muted-foreground" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">+8.2%</div>
              <p className="text-xs text-muted-foreground mt-1">Рост за неделю</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">
              <Icon name="Users" size={16} className="mr-2" />
              Пользователи
            </TabsTrigger>
            <TabsTrigger value="transactions">
              <Icon name="Receipt" size={16} className="mr-2" />
              Транзакции
            </TabsTrigger>
            <TabsTrigger value="stats">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Статистика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Управление пользователями</CardTitle>
                <CardDescription>Список всех игроков и управление их балансами</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Игрок</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Баланс</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Активность</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell className="font-mono font-semibold">
                          {user.balance.toLocaleString('ru-RU')} ₽
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="text-muted-foreground">{user.lastActivity}</TableCell>
                        <TableCell className="text-right">
                          <Dialog open={dialogOpen && selectedUser?.id === user.id} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                onClick={() => setSelectedUser(user)}
                              >
                                <Icon name="Pencil" size={14} className="mr-1" />
                                Изменить
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Изменить баланс</DialogTitle>
                                <DialogDescription>
                                  Игрок: {user.name} | Текущий баланс: {user.balance.toLocaleString('ru-RU')} ₽
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="amount">Сумма (положительная - начисление, отрицательная - списание)</Label>
                                  <Input
                                    id="amount"
                                    type="number"
                                    placeholder="Введите сумму"
                                    value={balanceAmount}
                                    onChange={(e) => setBalanceAmount(e.target.value)}
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setBalanceAmount('10000')}
                                  >
                                    +10 000 ₽
                                  </Button>
                                  <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setBalanceAmount('50000')}
                                  >
                                    +50 000 ₽
                                  </Button>
                                  <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setBalanceAmount('-10000')}
                                  >
                                    -10 000 ₽
                                  </Button>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  onClick={() =>
                                    handleBalanceUpdate(user.id, parseFloat(balanceAmount) || 0)
                                  }
                                  disabled={!balanceAmount}
                                >
                                  Применить
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Последние транзакции</CardTitle>
                <CardDescription>История операций игроков в реальном времени</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Тип</TableHead>
                      <TableHead>Игрок</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Время</TableHead>
                      <TableHead>Статус</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Icon
                              name={getTransactionIcon(transaction.type)}
                              size={18}
                              className={getTransactionColor(transaction.type)}
                            />
                            <span className="capitalize">{transaction.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{transaction.userName}</TableCell>
                        <TableCell className={`font-mono font-semibold ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {transaction.amount > 0 ? '+' : ''}
                          {transaction.amount.toLocaleString('ru-RU')} ₽
                        </TableCell>
                        <TableCell className="text-muted-foreground">{transaction.timestamp}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.status === 'completed'
                                ? 'default'
                                : transaction.status === 'pending'
                                ? 'secondary'
                                : 'destructive'
                            }
                          >
                            {transaction.status === 'completed' ? 'Завершена' : transaction.status === 'pending' ? 'В обработке' : 'Отклонена'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Динамика транзакций</CardTitle>
                  <CardDescription>Объем операций за последние 7 дней</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={[
                        { day: 'Пн', deposits: 450000, withdrawals: 280000, bets: 920000 },
                        { day: 'Вт', deposits: 380000, withdrawals: 320000, bets: 850000 },
                        { day: 'Ср', deposits: 520000, withdrawals: 290000, bets: 1100000 },
                        { day: 'Чт', deposits: 490000, withdrawals: 350000, bets: 980000 },
                        { day: 'Пт', deposits: 610000, withdrawals: 420000, bets: 1250000 },
                        { day: 'Сб', deposits: 720000, withdrawals: 480000, bets: 1450000 },
                        { day: 'Вс', deposits: 680000, withdrawals: 510000, bets: 1350000 },
                      ]}
                      margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Line type="monotone" dataKey="deposits" stroke="#22c55e" strokeWidth={2} />
                      <Line type="monotone" dataKey="withdrawals" stroke="#ef4444" strokeWidth={2} />
                      <Line type="monotone" dataKey="bets" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Распределение игр</CardTitle>
                  <CardDescription>По количеству ставок</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Рулетка', value: 1234 },
                          { name: 'Блэкджек', value: 987 },
                          { name: 'Слоты', value: 756 },
                          { name: 'Покер', value: 543 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        <Cell fill="hsl(var(--primary))" />
                        <Cell fill="hsl(var(--accent))" />
                        <Cell fill="#f59e0b" />
                        <Cell fill="#8b5cf6" />
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Топ игроков по балансу</CardTitle>
                  <CardDescription>Самые крупные счета</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={users
                        .sort((a, b) => b.balance - a.balance)
                        .slice(0, 6)
                        .map((u) => ({ name: u.name.split(' ')[0], balance: u.balance }))}
                      margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="balance" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Активность по часам</CardTitle>
                  <CardDescription>Пиковые времена игроков</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        { time: '00-06', activity: 12 },
                        { time: '06-12', activity: 35 },
                        { time: '12-18', activity: 28 },
                        { time: '18-00', activity: 25 },
                      ]}
                      margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="activity" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;