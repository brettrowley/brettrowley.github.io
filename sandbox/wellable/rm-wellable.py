#!usr/bin/Python
import urllib2
from time import gmtime, strftime

print "=====GATHERING DATA====="
print
request = urllib2.Request("https://www.kimonolabs.com/api/c0xh0bzc?apikey=kULyVYErfQfsy8mkfcSlLie5VvDkXQhh", headers={"authorization" : "Bearer 2uZMXOIbafpMXorDXzuvVa78wXaKB26P"})
contents = urllib2.urlopen(request).read()

row = ""
date1 = contents.find('thisversionrun":"')
date2 = contents.find('results')

dateRun = contents[(date1+len('thisversionrun":"')):(date2-14)]
hourRun = dateRun[(len(dateRun)-8):(len(dateRun)-3)]

row = row + dateRun + ", "

results1 = contents.find('Leaderboard')
allData = contents[(results1+len('Leaderboard:[{"')):(len(contents)-10)]
dataRows = allData.split('},{')

javascript= "var currentData = ['"

print "Rankings: "
for x in range(0, 6):
	teamData = dataRows[x].split('",')
	team = teamData[1].replace('"Team":"', '')
	points = teamData[2].replace('"Points":"', '')
	print team
	print points
	javascript = javascript + team + "','" + points + "','"
	row = row + team + ", " + points + ", "

row = row[:(len(row)-2)] + ";"
javascript = javascript + "']"

fa = open('rm-wellable-data.csv','a')
fa.write(row + "\n")
fa.close()


with open('data-array.js', 'w') as file:
    file.writelines(javascript + "\n" + "var timeRun = '" + str(dateRun) + "'")

fa = open('rm-wellable-data.csv','r')
txt = fa.read()
txt = txt.split(";")

labels = ""
YoungData = ""
UnicornData = ""
HASFALData = ""
LondonData = ""
DEData = ""
RogueData = ""


for i in range(1, (len(txt)-1)):
	line1 = txt[i].split(", ")
	dateTime1 = line1[0].split(" 2016 ")
	day1 = dateTime1[0]


	line2 = txt[i+1].split(", ")
	dateTime2 = line2[0].split(" 2016 ")
	day2 = dateTime2[0]
	
	if day1.replace(" ", "")!=day2.replace(" ", ""):
		print line1
		
		# sets chart x-axis values
		line1[0] = day1.replace("\n", "")
		labels = labels + '"' + day1.replace("\n", "") + '", '

		for j in range(1, (len(line1)-1)):
			if "Young" in line1[j]:
				YoungData = YoungData + line1[j+1].replace(",", "") + ', '
			elif "Unicorn" in line1[j]:
				UnicornData = UnicornData + line1[j+1].replace(",", "") + ', '
			elif "HASFAL" in line1[j]:
				HASFALData = HASFALData + line1[j+1].replace(",", "") + ', '
			elif "London" in line1[j]:
				LondonData = LondonData + line1[j+1].replace(",", "") + ', '
			elif "DE" in line1[j]:
				DEData = DEData + line1[j+1].replace(",", "") + ', '
			elif "Rogue" in line1[j]:
				RogueData = RogueData + line1[j+1].replace(",", "") + ', '

fa.close()



with open('chart-data.js', 'w') as file:
    file.writelines('var historicalData = {labels: ['+labels+'],'+"\n"+'datasets: [        {label: "The Young and the Rest of Us",'+"\n"+'            fillColor: "rgba(39, 174, 96,0)",'+"\n"+'            strokeColor: "rgba(39, 174, 96,1)",'+"\n"+'            pointColor: "rgba(39, 174, 96,1)",'+"\n"+'            pointStrokeColor: "#fff",'+"\n"+'            pointHighlightFill: "#fff",'+"\n"+'            pointHighlightStroke: "rgba(39, 174, 96,1)",'+"\n"+'            data: ['+YoungData+']        },'+"\n"+'        {label: "Unbeatable Unicorns",'+"\n"+'            fillColor: "rgba(22, 160, 133,0)",'+"\n"+'            strokeColor: "rgba(22, 160, 133,1)",'+"\n"+'            pointColor: "rgba(22, 160, 133,1)",'+"\n"+'            pointStrokeColor: "#fff",'+"\n"+'            pointHighlightFill: "#fff",'+"\n"+'            pointHighlightStroke: "rgba(22, 160, 133,1)",'+"\n"+'            data: ['+UnicornData+']        },'+"\n"+'        {label: "HASFAL",'+"\n"+'            fillColor: "rgba(243, 156, 18,0)",'+"\n"+'            strokeColor: "rgba(243, 156, 18,1)",'+"\n"+'            pointColor: "rgba(243, 156, 18,1)",'+"\n"+'            pointStrokeColor: "#fff",'+"\n"+'            pointHighlightFill: "#fff",'+"\n"+'            pointHighlightStroke: "rgba(243, 156, 18,1)",'+"\n"+'            data: ['+HASFALData+']        },'+"\n"+'        {label: "London Pride",'+"\n"+'            fillColor: "rgba(211, 84, 0,0)",'+"\n"+'            strokeColor: "rgba(211, 84, 0,1)",'+"\n"+'            pointColor: "rgba(211, 84, 0,1)",'+"\n"+'            pointStrokeColor: "#fff",'+"\n"+'            pointHighlightFill: "#fff",'+"\n"+'            pointHighlightStroke: "rgba(211, 84, 0,1)",'+"\n"+'            data: ['+LondonData+']        },'+"\n"+'        {label: "Rogue Nation",'+"\n"+'            fillColor: "rgba(192, 57, 43,0)",'+"\n"+'            strokeColor: "rgba(192, 57, 43,1)",'+"\n"+'            pointColor: "rgba(192, 57, 43,1)",'+"\n"+'            pointStrokeColor: "#fff",'+"\n"+'            pointHighlightFill: "#fff",'+"\n"+'            pointHighlightStroke: "rgba(192, 57, 43,1)",'+"\n"+'            data: ['+RogueData+']        },'+"\n"+'        {label: "S.M.A.R.T.@DE",'+"\n"+'            fillColor: "rgba(44, 62, 80,0)",'+"\n"+'            strokeColor: "rgba(44, 62, 80,1)",'+"\n"+'            pointColor: "rgba(44, 62, 80,1)",'+"\n"+'            pointStrokeColor: "#fff",'+"\n"+'            pointHighlightFill: "#fff",'+"\n"+'            pointHighlightStroke: "rgba(44, 62, 80,1)",'+"\n"+'            data: ['+DEData+']        }    ]};')