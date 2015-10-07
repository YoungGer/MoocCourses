setwd("~/Documents/GitHub_Project/MoocCourses/Duke_DASI")
ls()

dim(gss)
# 57061,114
names(gss)

sex = gss$sex
att = gss$coneduc

table(sex,att)
mosaicplot(table(sex,att))

d = data.frame(sex=sex,att=att)

d = subset(d,(!is.na(d$sex) )& (! is.na(d$att)))
head(d,200)
d
