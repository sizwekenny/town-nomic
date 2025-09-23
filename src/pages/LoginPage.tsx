import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'vendor'
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login process - simulate checking credentials
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock user data - determine role based on email for demo
      let role: 'admin' | 'vendor' | 'customer' = 'customer';
      if (loginData.email.includes('admin')) {
        role = 'admin';
      } else if (loginData.email.includes('vendor') || loginData.email.includes('owner')) {
        role = 'vendor';
      }
      
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: loginData.email,
        phone: '+27 82 123 4567',
        role: role
      };
      
      login(mockUser);
      
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      
      // Redirect to appropriate dashboard
      if (mockUser.role === 'admin') {
        navigate('/admin');
      } else if (mockUser.role === 'vendor') {
        navigate('/vendor');
      } else {
        navigate('/products');
      }
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Mock signup and automatic login
    setTimeout(() => {
      setIsLoading(false);
      
      // Create user object
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: signupData.name,
        email: signupData.email,
        phone: signupData.phone,
        role: signupData.role as 'admin' | 'vendor' | 'customer'
      };
      
      login(newUser);
      
      toast({
        title: "Account Created",
        description: "Welcome to Town-Nomic!",
      });
      
      // Redirect to appropriate dashboard based on role
      if (newUser.role === 'admin') {
        navigate('/admin');
      } else if (newUser.role === 'vendor') {
        navigate('/vendor');
      } else {
        navigate('/products');
      }
    }, 1000);
  };


  // OTP flow removed


  // OTP UI removed

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 gradient-hero rounded-lg flex items-center justify-center text-white font-bold">
              T
            </div>
            <span className="text-2xl font-bold text-foreground">Town-Nomic</span>
          </Link>
          <p className="text-muted-foreground mt-2">Securing the Unseen Economy</p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-lg animate-scale-in">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              {/* Dummy login details for demo/testing */}
              <div className="mb-4 p-4 rounded-lg bg-muted/50 border text-xs text-muted-foreground">
                <div className="mb-2 font-semibold text-foreground">Demo Login Details:</div>
                <div><span className="font-semibold">Admin:</span> admin@townnomic.co.za / any password</div>
                <div><span className="font-semibold">Vendor:</span> vendor@townnomic.co.za / any password</div>
                <div><span className="font-semibold">Customer:</span> customer@townnomic.co.za / any password</div>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <h2 className="text-xl font-semibold text-center mb-4">Welcome Back</h2>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Your password"
                      className="pl-10 pr-10"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full btn-primary"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
                <div className="text-center">
                  <Button variant="link" className="text-primary">
                    Forgot your password?
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <h2 className="text-xl font-semibold text-center mb-4">Create Account</h2>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      className="pl-10"
                      value={signupData.name}
                      onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+27 12 345 6789"
                      className="pl-10"
                      value={signupData.phone}
                      onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">I want to join as</Label>
                  <Select onValueChange={(value) => setSignupData({...signupData, role: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="vendor">Product Owner/Vendor</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      className="pl-10 pr-10"
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full btn-primary"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};