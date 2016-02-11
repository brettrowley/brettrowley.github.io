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

dateRun = contents[(date1+len('thisversionrun":"')):(date2-18)]
hourRun = dateRun[(len(dateRun)-8):(len(dateRun)-6)]

row = row + dateRun + ", "

results1 = contents.find('Leaderboard')
allData = contents[(results1+len('Leaderboard:[{"')):(len(contents)-10)]
dataRows = allData.split('},{')

javascript= "var data = ['"

print "Rankings: "
for x in range(0, 6):
	teamData = dataRows[x].split('",')
	team = teamData[1].replace('"Team":"', '')
	points = teamData[2].replace('"Points":"', '')
	print team
	print points

	javascript = javascript + team + "','" + points + "','"
	row = row + team + ", " + points + ", "

javascript = javascript + "']"

fa = open('rm-wellable-data.csv','a')
fa.write(row + "\n")
fa.close()


with open('data-array.js', 'w') as file:
    file.writelines(javascript + "\n" + "var hourRun = " + str(hourRun))