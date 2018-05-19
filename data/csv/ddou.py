from __future__ import division
import collections
import time
import re

lineNumber=0;
f1=file('proxOut-MC2.csv',"r")
result=[]
a=[]
i=0
data=[]

# construct a list data[]
for line in f1:
    lineNumber+=1
    a=line.strip()
    if lineNumber == 1:
        continue
    b=a.split(',')
    row=[]
    row.append(b[2])
    row.append(b[0])
    data.append(row)
f1.close()
print "finish loading data"
num=len(data)
max=data[num-1][1]
for i in range(0,num):
    temp=data[i][0]+","+data[i][1]
    flag=False
    for j in range(i+1,num):
        if data[i][0]==data[j][0]:
            flag=True
            temp+=","+data[j][1]
            break
    if flag==False:
        temp+=","+max
    result.append(temp)


#print "Apple virtual Macaddress Number: ",lineNumber
#print "Detected Macaddress ",lineNumber2

# save results

f=open('ddou.csv','w')
for k in range(len(result)):
    content=result[k]
    f.write(content+"\n")
f.close()
print "finished"
