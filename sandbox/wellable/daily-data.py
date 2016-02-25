#!usr/bin/Python
import urllib2
from time import gmtime, strftime
import numpy

fa = open('rm-wellable-data.csv','r')
txt = fa.read()
txt = txt.split(";")

labels = ""
YoungData = []
UnicornData = []
HASFALData = []
LondonData = []
DEData = []
RogueData = []

YoungDaily = []
UnicornDaily = []
HASFALDaily = []
LondonDaily = []
DEDaily = []
RogueDaily = []


for i in range(1, (len(txt)-1)):
	line1 = txt[i].split(", ")
	dateTime1 = line1[0].split(" 2016 ")
	day1 = dateTime1[0]


	line2 = txt[i+1].split(", ")
	dateTime2 = line2[0].split(" 2016 ")
	day2 = dateTime2[0]
	
	if day1.replace(" ", "")!=day2.replace(" ", ""):
		
		# sets chart x-axis values
		line1[0] = day1.replace("\n", "")
		labels = labels + '"' + day1.replace("\n", "") + '", '

		for j in range(1, (len(line1)-1)):
			if "Young" in line1[j]:
				YoungData.append(float(line1[j+1].replace(",", "")))
			elif "Unicorn" in line1[j]:
				UnicornData.append(float(line1[j+1].replace(",", "")))
			elif "HASFAL" in line1[j]:
				HASFALData.append(float(line1[j+1].replace(",", "")))
			elif "London" in line1[j]:
				LondonData.append(float(line1[j+1].replace(",", "")))
			elif "DE" in line1[j]:
				DEData.append(float(line1[j+1].replace(",", "")))
			elif "Rogue" in line1[j]:
				RogueData.append(float(line1[j+1].replace(",", "")))
fa.close()

for k in range(0, len(YoungData)-1):
	diff = int(YoungData[k+1] - YoungData[k])
	YoungDaily.append(diff)
for k in range(0, len(UnicornData)-1):
	diff = int(UnicornData[k+1] - UnicornData[k])
	UnicornDaily.append(diff)
for k in range(0, len(HASFALData)-1):
	diff = int(HASFALData[k+1] - HASFALData[k])
	HASFALDaily.append(diff)
for k in range(0, len(LondonData)-1):
	diff = int(LondonData[k+1] - LondonData[k])
	LondonDaily.append(diff)
for k in range(0, len(DEData)-1):
	diff = int(DEData[k+1] - DEData[k])
	DEDaily.append(diff)
for k in range(0, len(RogueData)-1):
	diff = int(RogueData[k+1] - RogueData[k])
	RogueDaily.append(diff)

print numpy.mean(YoungDaily)
print numpy.mean(UnicornDaily)
print numpy.mean(HASFALDaily)
print numpy.mean(LondonDaily)
print numpy.mean(RogueDaily)
print numpy.mean(DEDaily)


with open('chart-data.js', 'w') as file:
    file.writelines('var historicalData = {labels: ['+labels+'],'+"\n"+'datasets: [        {label: "The Young and the Rest of Us",'+"\n"+'            fillColor: "rgba(39, 174, 96,0)",'+"\n"+'            strokeColor: "rgba(39, 174, 96,1)",'+"\n"+'            pointColor: "rgba(39, 174, 96,1)",'+"\n"+'            pointStrokeColor: "#fff",'+"\n"+'            pointHighlightFill: "#fff",'+"\n"+'            pointHighlightStroke: "rgba(39, 174, 96,1)",'+"\n"+'            data: '+str(YoungData)+'        },'+"\n"+'        {label: "Unbeatable Unicorns",'+"\n"+'            fillColor: "rgba(22, 160, 133,0)",'+"\n"+'            strokeColor: "rgba(22, 160, 133,1)",'+"\n"+'            pointColor: "rgba(22, 160, 133,1)",'+"\n"+'            pointStrokeColor: "#fff",'+"\n"+'            pointHighlightFill: "#fff",'+"\n"+'            pointHighlightStroke: "rgba(22, 160, 133,1)",'+"\n"+'            data: '+str(UnicornData)+'        },'+"\n"+'        {label: "HASFAL",'+"\n"+'            fillColor: "rgba(243, 156, 18,0)",'+"\n"+'            strokeColor: "rgba(243, 156, 18,1)",'+"\n"+'            pointColor: "rgba(243, 156, 18,1)",'+"\n"+'            pointStrokeColor: "#fff",'+"\n"+'            pointHighlightFill: "#fff",'+"\n"+'            pointHighlightStroke: "rgba(243, 156, 18,1)",'+"\n"+'            data: '+str(HASFALData)+'        },'+"\n"+'        {label: "London Pride",'+"\n"+'            fillColor: "rgba(211, 84, 0,0)",'+"\n"+'            strokeColor: "rgba(211, 84, 0,1)",'+"\n"+'            pointColor: "rgba(211, 84, 0,1)",'+"\n"+'            pointStrokeColor: "#fff",'+"\n"+'            pointHighlightFill: "#fff",'+"\n"+'            pointHighlightStroke: "rgba(211, 84, 0,1)",'+"\n"+'            data: '+str(LondonData)+'        },'+"\n"+'        {label: "Rogue Nation",'+"\n"+'            fillColor: "rgba(192, 57, 43,0)",'+"\n"+'            strokeColor: "rgba(192, 57, 43,1)",'+"\n"+'            pointColor: "rgba(192, 57, 43,1)",'+"\n"+'            pointStrokeColor: "#fff",'+"\n"+'            pointHighlightFill: "#fff",'+"\n"+'            pointHighlightStroke: "rgba(192, 57, 43,1)",'+"\n"+'            data: '+str(RogueData)+'        },'+"\n"+'        {label: "S.M.A.R.T.@DE",'+"\n"+'            fillColor: "rgba(44, 62, 80,0)",'+"\n"+'            strokeColor: "rgba(44, 62, 80,1)",'+"\n"+'            pointColor: "rgba(44, 62, 80,1)",'+"\n"+'            pointStrokeColor: "#fff",'+"\n"+'            pointHighlightFill: "#fff",'+"\n"+'            pointHighlightStroke: "rgba(44, 62, 80,1)",'+"\n"+'            data: '+str(DEData)+'        }    ]};')
with open('chart-daily.js', 'w') as file:
    file.writelines('var dailyData = {labels: ['+labels+'],'+"\n"+'datasets: [        {label: "The Young and the Rest of Us",'+"\n"+'            fillColor: "rgba(39, 174, 96,1)",'+"\n"+'            strokeColor: "rgba(39, 174, 96,1)",'+"\n"+'             highlightFill: "#ff6600)",'+"\n"+'            highlightStroke: "rgba(39, 174, 96,1)",'+"\n"+'            data: '+str(YoungDaily)+'        },'+"\n"+'        {label: "Unbeatable Unicorns",'+"\n"+'            fillColor: "rgba(22, 160, 133,1)",'+"\n"+'            strokeColor: "rgba(22, 160, 133,1)",'+"\n"+'              highlightFill: "#ff6600)",'+"\n"+'            highlightStroke: "rgba(22, 160, 133,1)",'+"\n"+'            data: '+str(UnicornDaily)+'        },'+"\n"+'        {label: "HASFAL",'+"\n"+'            fillColor: "rgba(243, 156, 18,1)",'+"\n"+'            strokeColor: "rgba(243, 156, 18,1)",'+"\n"+'              highlightFill: "#ff6600)",'+"\n"+'            highlightStroke: "rgba(243, 156, 18,1)",'+"\n"+'            data: '+str(HASFALDaily)+'        },'+"\n"+'        {label: "London Pride",'+"\n"+'            fillColor: "rgba(211, 84, 0,1)",'+"\n"+'            strokeColor: "rgba(211, 84, 0,1)",'+"\n"+'            highlightFill: "#ff6600",'+"\n"+'            highlightStroke: "rgba(211, 84, 0,1)",'+"\n"+'            data: '+str(LondonDaily)+'        },'+"\n"+'        {label: "Rogue Nation",'+"\n"+'            fillColor: "rgba(192, 57, 43,1)",'+"\n"+'            strokeColor: "rgba(192, 57, 43,1)",'+"\n"+'             highlightFill: "#ff6600)",'+"\n"+'            highlightStroke: "rgba(192, 57, 43,1)",'+"\n"+'            data: '+str(RogueDaily)+'        },'+"\n"+'        {label: "S.M.A.R.T.@DE",'+"\n"+'            fillColor: "rgba(44, 62, 80,1)",'+"\n"+'            strokeColor: "rgba(44, 62, 80,1)",'+"\n"+'            highlightFill: "#ff6600",'+"\n"+'            highlightStroke: "rgba(44, 62, 80,1)",'+"\n"+'            data: '+str(DEDaily)+'        }    ]};')



