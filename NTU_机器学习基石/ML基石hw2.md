

    import random
    import copy
    import scipy as sp
    import os
    import numpy as np


    #Q16
    def sign(x):
        if (x>=0):
            return 1
        else:
            return -1


    def accuracy(set1,set2):
        if (len(set1)!=len(set2)):
            print ("error")
        else:
            l = len(set1)
            suml = 0
            for i in range(l):
                if set1[i]==set2[i]:
                    suml += 1
        return float(suml)/l
            


    def h(s,theta,x):
        return s*sign(x-theta)


    def eout(s,theta):
        return 0.5+0.3*s*(abs(theta)-1)


    #产生大小为20的x，y数据
    def generateData():
        xset= []
        yset= []
        choices = [1,1,1,1,-1]
        for i in range(20):
            x = random.uniform(-1,1)
            y = sign(x)*random.choice(choices)
            xset.append(x)
            yset.append(y)
        return (xset,yset)


    #将输入的数组排序，输出排序后的x,y
    def paixu(xset,yset):
        n = len(yset)
        #产生xsort，并将其排序
        xsort = copy.deepcopy(xset)
        xsort.sort()
        y = [0]*n
        for i in range(n):
            y[i] = yset[xset.index(xsort[i])]
        return (xsort,y)
        
        


    def stump(xset,yset):
        #先对原数组进行排序
        xsort,ysort = paixu(xset,yset)
        #设置最优参数
        bestaccu = 0
        besti = 0
        bestiArray =[]
        for i in range(40):
            #遍历各种情况
            if i < 20:
                yp = [-1]*i + [1]*(20-i)
            else:
                ii = i-20
                yp = [1]*ii + [-1]*(20-ii)
            Accu = accuracy(yp,ysort)
    
            if Accu>bestaccu:
                bestaccu = Accu
                besti = i
                bestiArray =[]
                bestiArray.append(i) 
            elif Accu==bestaccu:
                bestiArray.append(i)   
                
            besti = random.choice(bestiArray)
        #print besti,bestaccu
        #已经遍历完所有可能情况了
        if (besti<20):
            #说明s是正的情况，第i个数据是负的，第i+1个数据是正的
            s = 1
            if (besti==19):
                theta =(xsort[besti]+xsort[besti-1])/2
            elif (besti==0):
                theta =xsort[besti]
            else:
                theta = (xsort[besti]+xsort[besti+1])/2
        else:
            #说明s是负的情况，第i个数据是正的的，第i+1个数据是负的的
            s = -1
            if (besti==39):
                theta =(xsort[besti-20]+xsort[besti-20-1])/2
            elif (besti==20):
                theta =xsort[besti-20]
            else:
                theta = (xsort[besti-20]+xsort[besti-20+1])/2
        oute = eout(s,theta)
        return (1-bestaccu,oute)


    def main():
        x,y = generateData()
        return stump(x,y)


    #Q17
    eein = []
    eeout = []
    for i in range(5000):
        nei,wai = main()
        eein.append(nei)
        eeout.append(wai)
        
        


    #Q17
    sp.mean(eein)




    0.16893




    #Q18
    sp.mean(eeout)




    0.2685752190465644




    #multi-dimensional
    #读取输入训练和测试数据


    os.chdir('E:\\\xce\xd2\xb5\xc4\xbc\xe1\xb9\xfb\xd4\xc6')


    trainfile = open("train.txt")
    train = []
    for line in trainfile:
        a1 = line.strip().split()
        train.append (map(lambda x:float(x),a1))
    trainfile.close()
    trainfile.closed




    True




    testfile = open("test.txt")
    test = []
    for line in testfile:
        a1 = line.strip().split()
        test.append (map(lambda x:float(x),a1))
    testfile.close()
    testfile.closed




    True




    train = np.array(train)
    test = np.array(test)
    print train.shape
    print test.shape

    (100L, 10L)
    (1000L, 10L)
    


    def stump2(xset,yset,N):
        #先对原数组进行排序
        xsort,ysort = paixu(xset,yset)
        #设置最优参数
        bestaccu = 0
        besti = 0
        bestiArray =[]
        
        for i in range(N*2):
            #遍历各种情况
            if i < N:
                yp = [-1]*i + [1]*(N-i)
            else:
                ii = i-N
                yp = [1]*ii + [-1]*(N-ii)
            Accu = accuracy(yp,ysort)
    
            if Accu>bestaccu:
                bestaccu = Accu
                besti = i
                bestiArray =[]
                bestiArray.append(i) 
            elif Accu==bestaccu:
                bestiArray.append(i)   
                
            besti = random.choice(bestiArray)
        #print besti,bestaccu
        #已经遍历完所有可能情况了
        if (besti<N):
            #说明s是正的情况，第i个数据是负的，第i+1个数据是正的
            s = 1
            if (besti==N-1):
                theta =(xsort[besti]+xsort[besti-1])/2
            elif (besti==0):
                theta =xsort[besti]
            else:
                theta = (xsort[besti]+xsort[besti+1])/2
        else:
            #说明s是负的情况，第i个数据是正的的，第i+1个数据是负的的
            s = -1
            if (besti==N*2-1):
                theta =(xsort[besti-N]+xsort[besti-N-1])/2
            elif (besti==N):
                theta =xsort[besti-N]
            else:
                theta = (xsort[besti-N]+xsort[besti-N+1])/2
        oute = eout(s,theta)
        #return (1-bestaccu,oute)  #Q18
        return (s,theta)


    #Q19
    for i in range(9):
        print stump2(list(train[:,i]),list(train[:,-1]),100)

    (-1, 5.3004999999999995)
    (1, -2.1305000000000001)
    (1, -8.3324999999999996)
    (-1, 1.8835000000000002)
    (1, -7.843)
    (-1, 4.3879999999999999)
    (-1, 4.2435)
    (-1, -2.6795)
    (-1, 0.048000000000000001)
    


    testsets = []
    for i in list(test[:,3]):
        testsets.append(h(-1, 1.8835000000000002,i))


    len(testsets)
    
    




    1000




    #Q20
    accuracy(testsets,list(test[:,-1]))




    0.633


