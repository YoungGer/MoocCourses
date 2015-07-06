
# coding: utf-8

# In[10]:

#设置工作空间
import os
os.chdir("./Downloads/")
os.getcwd()


# In[55]:

#获得数据列表
l = [] #此项包含了1000个数据
l_test = [1,3,5,2,4,6] #此项为简单的测试数据
with open("IntegerArray.txt","r") as f:
    for line in f:
        l.append(float(line))


# In[98]:

#定义MergeSort算法
class MergeSort:
    def __init__(self,l):
        self.l = l
        self.length = len(l)
    def merge(self,a,b):
        #preparation
        i=0
        i1=len(a)
        j=0
        j1=len(b)
        n =i1+j1
        l=[]
        #iteration
        for x in range(n):
            if(a[i]<b[j]):
                l.append(a[i])
                i += 1
                if (i==i1):
                    for x in range(j,j1):
                        l.append(b[x])
                    break                  
            else:
                l.append(b[j])
                j += 1
                if (j==j1):
                    for x in range(i,i1):
                        l.append(a[x])
                    break
        return l
                
                
    def sort(self,l):
        n = len(l)
        #基础情况
        if (n==1):
            return l
        #非基础情况，分组
        a = l[0:n/2]
        b = l[n/2:]  #奇数的话b的个数比a多1
        return self.merge(self.sort(a), self.sort(b))
    
    def test(self):
        print self.l
        print self.length


# In[106]:

#Inversion算法
class Inversion:
    def __init__(self,l):
        self.l = l
        self.length = len(l)
    def splitmerge(self,a,b):
        # a,b is arrays which is sorted
        #preparation
        lena = len(a)
        lenb = len(b)
        ai = 0
        bi = 0
        n = lena+lenb
        r_num = 0
        for i in range(n):
            if(a[ai]>b[bi]):
                r_num += len(a[ai:])
                bi += 1
                if (bi==lenb):
                    break                
            else:     
                ai += 1     
                if (ai==lena):
                    break 
        return r_num
    def invers(self,l):
        n = len(l)
        #基础情况
        if (n==1 or n==0):
            return 0
        #非基础情况，分组并排序
        a = l[0:n/2]
        a_sort = MergeSort([]).sort(a)
        b = l[n/2:]  #奇数的话b的个数比a多1
        b_sort = MergeSort([]).sort(b)
        return self.invers(a)+self.invers(b)+self.splitmerge(a_sort,b_sort)
    def test(self):
        pass

