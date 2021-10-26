{\rtf1\ansi\ansicpg1252\cocoartf2580
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 var viewportWidth = window.innerWidth;\
var viewportHeight = window.innerHeight;\
var widthOfRect;\
var heightOfRect;\
\
//dragging kontrol\'fc i\'e7in gerekli boolean de\uc0\u287 i\u351 keni\
var dragging = false;\
//hangi s\uc0\u305 radaki dikd\'f6rtgenin drag edildi\u287 i bilgisini ta\u351 \u305 yan de\u287 i\u351 ken\
var draggedRect;\
\
//hareket edecek dikd\'f6rtgenler i\'e7in gerekli de\uc0\u287 i\u351 kenler. Sa\u287 a do\u287 ru giden dikd\'f6rtgen \'e7izdirilirken x de\u287 eri artmal\u305 , sol i\'e7in ise azalmal\u305 d\u305 r. Swapnum yol boyunca x'in sahip oldu\u287 u de\u287 eri g\'f6sterir.\
var swappedToRight;\
var swappedToLeft;\
var swapnum;\
\
//dikd\'f6rtgenlerin k\'f6\uc0\u351 esinin rounded olmas\u305  i\'e7in gerekli de\u287 i\u351 ken\
var diameter = 20;\
\
//dragging yap\uc0\u305 l\u305 rken kontrol\'fcn sa\u287 lanmas\u305  i\'e7in mouse'un koordinatlar\u305 n\u305 n atand\u305 \u287 \u305  de\u287 i\u351 ken\
var newX;\
var newY;\
\
//mouse'un koordinatlar\uc0\u305 n\u305 n dikd\'f6rtgen'in sol \'fcst k\'f6\u351 esinden uzakl\u305 \u287 \u305  i\'e7in gerekli de\u287 i\u351 kenler\
var newWidth;\
var newLength;\
\
//Ekranda renderlanacak dikd\'f6rtgenlerinin x de\uc0\u287 erlerinin tutuldu\u287 u array\
var arrayX = [];\
//Ekranda renderlanacak dikd\'f6rtgenlerinin y de\uc0\u287 erinin tutuldu\u287 u de\u287 i\u351 ken\
var y;\
\
//random doldurulan renk bilgilerinin tutuldu\uc0\u287 u array\
var colorArray = [];\
\
function setup() \{\
	createCanvas(viewportWidth, viewportHeight);\
	//random color'lardan bir array olu\uc0\u351 turuldu\
	for (let i = 0; i < 7; i++) \{\
		var color = getRandomColor();\
		colorArray.push(color);\
	\}\
\
	var gap = 15;\
	var w = viewportWidth;\
	w = w - (8 * gap);\
	widthOfRect = (w / 7);\
	heightOfRect = 80;\
\
	for (let i = 0; i < 7; i++) \{\
		arrayX.push(gap + (i * (widthOfRect + gap)));\
	\}\
	y = ((viewportHeight - heightOfRect) / 2);\
\}\
\
function draw() \{\
	createCanvas(viewportWidth, viewportHeight);\
	background(1);\
\
\
	if (dragging) \{\
		//dragging yap\uc0\u305 l\u305 yorsa mouse'un koordinatlar\u305  newX ve newY de\u287 i\u351 kenlerine atan\u305 yor\
		newX = mouseX;\
		newY = mouseY;\
\
		//dikd\'f6rtgenlerin \'e7izilebilmesi i\'e7in bir for d\'f6ng\'fcs\'fc\
		for (let i = 0; i < 7; i++) \{\
			let c = color(colorArray[i]);\
			fill(c);\
\
			if (i != draggedRect) \{\
				//sa\uc0\u287 a do\u287 ru gidecek bir dikd\'f6rtgen, durmas\u305  gereken yere kadar 3 piksel aral\u305 klarla gider\
				if (i == swappedToRight) \{\
					rect(swapnum, y, widthOfRect, heightOfRect, diameter);\
					if (Math.abs(swapnum - arrayX[i]) < 3) \{\
						swappedToRight = null;\
					\} else \{\
						swapnum += 3;\
					\}\
\
				\} else if (i == swappedToLeft) \{\
					//sola do\uc0\u287 ru gidecek bir dikd\'f6rtgen, durmas\u305  gereken yere kadar 3 piksel aral\u305 klarla gider\
					rect(swapnum, y, widthOfRect, heightOfRect, diameter);\
					if (Math.abs(swapnum - arrayX[i])< 3) \{\
                      \
						swappedToLeft = null;\
					\} else \{\
						swapnum -= 3;\
					\}\
\
				\} else \{\
					//hareket etmeyen bir dikd\'f6rtgenin \'e7izilmesi\
					rect(arrayX[i], y, widthOfRect, heightOfRect, diameter);\
				\}\
\
			\}\
			// e\uc0\u287 er drag edilen ise mouse'un ta\u351 \u305 mas\u305  i\'e7in gerekli algoritma\
			else \{\
				rect(newX - newWidth, newY - newLength, widthOfRect, heightOfRect, diameter);\
				//dikd\'f6rtgen ta\uc0\u351 \u305 n\u305 rken sa\u287 a do\u287 ru g\'f6t\'fcr\'fcl\'fcrse de\u287 i\u351 im sa\u287 lanmas\u305  i\'e7in gerekli kontrol\
				if (i < arrayX.length - 1) \{\
\
					if (newX - newWidth > arrayX[i + 1] && newY < (y + heightOfRect) && newY > y) \{\
						// swap i\uc0\u351 lemi yap\u305 l\u305 yor ki ta\u351 \u305 nan dikd\'f6rtgen gerekli yerini als\u305 n. Ve de hareket edecek dikd\'f6rtgenin indeksi belirleniyor\
						draggedRect = i + 1;\
						swappedToLeft = i;\
						swapnum = arrayX[i + 1];\
\
						//swap i\uc0\u351 lemi renk i\'e7in de yap\u305 lmal\u305   \
						var temp = colorArray[i + 1];\
						colorArray[i + 1] = colorArray[i];\
						colorArray[i] = temp;\
					\}\
				\}\
				//dikd\'f6rtgen ta\uc0\u351 \u305 n\u305 rken sola do\u287 ru g\'f6t\'fcr\'fcl\'fcrse de\u287 i\u351 im sa\u287 lanmas\u305  i\'e7in gerekli kontrol. Ve de hareket edecek dikd\'f6rtgenin indeksi belirleniyor\
				if (i > 0) \{\
					if (newX - newWidth < arrayX[i - 1] && newY < (y + heightOfRect) && newY > y) \{\
						// swap i\uc0\u351 lemi yap\u305 l\u305 yor ki ta\u351 \u305 nan dikd\'f6rtgen gerekli yerini als\u305 n. Ve de hareket edecek dikd\'f6rtgenin indeksi belirleniyor\
						draggedRect = i - 1;\
						swappedToRight = i;\
						swapnum = arrayX[i - 1];\
\
						//swap i\uc0\u351 lemi renk i\'e7in de yap\u305 lmal\u305   \
						var temp = colorArray[i - 1];\
						colorArray[i - 1] = colorArray[i];\
						colorArray[i] = temp;\
					\}\
				\}\
\
			\}\
		\}\
	\}\
	//herhangi bir dragging i\uc0\u351 lemi yoksa s\u305 rayla dikd\'f6rtgenler \'e7izdiriliyor\
	else \{\
		for (let i = 0; i < 7; i++) \{\
			let c = color(colorArray[i]);\
			fill(c);\
			rect(arrayX[i], y, widthOfRect, heightOfRect, diameter);\
		\}\
	\}\
\}\
\
//mouse'a bas\uc0\u305 ld\u305 \u287 \u305 nda koordinatlar al\u305 n\u305 yor\
function mousePressed() \{\
	for (let i = 0; i < arrayX.length; i++) \{\
		//mouse'un dikd\'f6rtgenin \'fcst\'fcnde olma duruma dair bilgi al\uc0\u305 n\u305 yor\
		if (isInRectangle(arrayX[i], y, mouseX, mouseY)) \{\
			//mouse birinin \'fcst\'fcnde ise, ka\'e7\uc0\u305 nc\u305  dikd\'f6rtgen oldu\u287 u bilgisi al\u305 n\u305 yor, dikd\'f6rtgenin sol \'fcst k\'f6\u351 esine g\'f6re \'e7izdirme ayarlamalar\u305 n\u305 n yap\u305 labilmesi i\'e7in uzunluk bilgileri al\u305 n\u305 yor ve dragging bool'u set ediliyor \
			draggedRect = i;\
			newWidth = mouseX - arrayX[i];\
			newLength = mouseY - y;\
			dragging = true;\
\
		\}\
	\}\
\}\
\
function mouseReleased() \{\
	//Mouse b\uc0\u305 rak\u305 ld\u305 \u287 \u305 nda t\'fcm hareketi initialize eden de\u287 i\u351 kenler ba\u351 lang\u305 \'e7 de\u287 erlerine set ediliyor\
	dragging = false;\
	draggedRect = null;\
	swappedtoRight = null;\
	swappedtoLeft = null;\
\}\
\
//mouse'un dikd\'f6rtgenlerin \'fcst\'fcnde olup olmama kontrol\'fc i\'e7in gereken kontrol\
function isInRectangle(xCoord, yCoord, mouseXCoord, mouseYCoord) \{\
	if ((xCoord < mouseXCoord) && (mouseXCoord < (xCoord + heightOfRect)) && (yCoord < mouseYCoord) && (mouseYCoord < (heightOfRect + y))) \{\
		return true;\
	\}\
	return false;\
\
\}\
\
//return value'sunda random renk elde edilen algoritma\
function getRandomColor() \{\
	var letters = '0123456789ABCDEF';\
	var color = '#';\
	for (var i = 0; i < 6; i++) \{\
		color += letters[Math.floor(Math.random() * 16)];\
	\}\
	return color;\
\}\
\
// windowsize de\uc0\u287 i\u351 irse \'e7a\u287 \u305 r\u305 lacak fonksiyon\
window.addEventListener('resize', function() \{\
\
viewportWidth = window.innerWidth;\
vviewportHeight = window.innerHeight;\
\
	var gap = 15;\
	var w = viewportWidth;\
	w = w - (8 * gap);\
	widthOfRect = (w / 7);\
	heightOfRect = 80;\
\
	for (let i = 0; i < 7; i++) \{\
		arrayX.push(gap + (i * (widthOfRect + gap)));\
	\}\
	y = ((viewportHeight - heightOfRect) / 2);\
\});}