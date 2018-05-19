from __future__ import division
import collections
import time
import re

f1=file('total_electricity_power.csv',"r")
raw_data=[]
a=[]
elec_power=0
i=0
# counting brand of detected macaddress and apple virtual macaddress
for line in f1:
    a=line.strip()
    if i == 0:
        raw_data.append(a)
        i+=1
        continue

    b=a.split(',')
    elec_power+=float(b[1])
    if i%12==0:
        num = len(b[0])
        time = b[0][0:num-2]
        oneline = time+"00,"+str(elec_power)
        elec_power = 0
        raw_data.append(oneline)
    i+=1
f1.close()
print "finish loading data"


#print "Apple virtual Macaddress Number: ",lineNumber
#print "Detected Macaddress ",lineNumber2

# save results

f=open('elec_power.csv','w')
for k in range(len(raw_data)):
    content=raw_data[k]
    f.write(content+"\n")
f.close()
print "finished"
