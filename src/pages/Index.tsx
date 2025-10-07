import { useState } from 'react';
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
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Александр Петров',
      type: 'deposit',
      amount: 50000,
      timestamp: '10:45',
      status: 'completed',
    },
    {
      id: '2',
      userId: '2',
      userName: 'Мария Иванова',
      type: 'win',
      amount: 25000,
      timestamp: '10:30',
      status: 'completed',
    },
    {
      id: '3',
      userId: '3',
      userName: 'Дмитрий Сидоров',
      type: 'bet',
      amount: -5000,
      timestamp: '10:15',
      status: 'completed',
    },
    {
      id: '4',
      userId: '4',
      userName: 'Елена Козлова',
      type: 'withdrawal',
      amount: -10000,
      timestamp: '10:00',
      status: 'pending',
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
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Популярные игры</CardTitle>
                  <CardDescription>Топ игр по количеству ставок</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="Dices" size={24} className="text-primary" />
                      <div>
                        <p className="font-medium">Рулетка</p>
                        <p className="text-sm text-muted-foreground">1,234 ставки</p>
                      </div>
                    </div>
                    <Badge>+18%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="Spade" size={24} className="text-primary" />
                      <div>
                        <p className="font-medium">Блэкджек</p>
                        <p className="text-sm text-muted-foreground">987 ставок</p>
                      </div>
                    </div>
                    <Badge>+12%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="CircleDollarSign" size={24} className="text-primary" />
                      <div>
                        <p className="font-medium">Слоты</p>
                        <p className="text-sm text-muted-foreground">756 ставок</p>
                      </div>
                    </div>
                    <Badge>+8%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Активность по часам</CardTitle>
                  <CardDescription>Пиковые времена игроков</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">00:00 - 06:00</span>
                      <span className="font-medium">12%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '12%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">06:00 - 12:00</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '35%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">12:00 - 18:00</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '28%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">18:00 - 00:00</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '25%' }} />
                    </div>
                  </div>
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
