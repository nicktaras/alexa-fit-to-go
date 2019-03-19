// https://www.betterhealth.vic.gov.au/health/ten-tips/10-tips-to-exercise-safely

const TipStore = {
	WARMUP: [
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques."
	],
	JOG: [
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Try and mix up your routine. Try other sports and exercises to reduce the risk of overtraining in one specific area.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Be sensible, especially at night or in secluded areas. Take a friend or your dog, stick to well-lit areas and wear bright or light-reflective clothing so drivers can see you.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	RUN: [
		"Be sensible, especially at night or in secluded areas. Take a friend or your dog, stick to well-lit areas and wear bright or light-reflective clothing so drivers can see you.",
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Try and mix up your routine. Try other sports and exercises to reduce the risk of overtraining in one specific area.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	SWIM: [
		"When swimming it is possible to gain groin injuries, especially in breaststroke. To help prevent such an injury make sure you stretch your lower body well.",
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Try and mix up your routine. Try other sports and exercises to reduce the risk of overtraining in one specific area.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	SOCCER: [
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Did you know that the most common sports injuries include Ankle sprain, Groin pull, Hamstring strain, Shin splints, and knee injury. By warming up and stretching you can help to lower the risk of having such injuries. ",
		"Did you know that the following sports are known to cause the most injuries. Ice hockey, volleyball, softball, wrestling, boxing, martial arts, gymnastics, cheerleading, dance, baseball, soccer, basketball. Take it easy out there. ",
		"Try and mix up your routine. Try other sports and exercises to reduce the risk of overtraining in one specific area.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	NETBALL: [
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Did you know that the most common sports injuries include Ankle sprain, Groin pull, Hamstring strain, Shin splints, and knee injury. By warming up and stretching you can help to lower the risk of having such injuries. ",
		"Try and mix up your routine. Try other sports and exercises to reduce the risk of overtraining in one specific area.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	BASKETBALL: [
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Did you know that the most common sports injuries include Ankle sprain, Groin pull, Hamstring strain, Shin splints, and knee injury. By warming up and stretching you can help to lower the risk of having such injuries. ",
		"Did you know that the following sports are known to cause the most injuries. Ice hockey, volleyball, softball, wrestling, boxing, martial arts, gymnastics, cheerleading, dance, baseball, soccer, basketball. Take it easy out there. ",
		"Try and mix up your routine. Try other sports and exercises to reduce the risk of overtraining in one specific area.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	GOLF: [
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Did you know that the most common sports injuries include Ankle sprain, Groin pull, Hamstring strain, Shin splints, and knee injury. By warming up and stretching you can help to lower the risk of having such injuries. ",
		"Try and mix up your routine. Try other sports and exercises to reduce the risk of overtraining in one specific area.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	DANCE: [
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Try and mix up your routine. Try other sports and exercises to reduce the risk of overtraining in one specific area.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!"
	],
	TENNIS: [
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Did you know that the most common sports injuries include Ankle sprain, Groin pull, Hamstring strain, Shin splints, and knee injury. By warming up and stretching you can help to lower the risk of having such injuries. ",
		"Try and mix up your routine. Try other sports and exercises to reduce the risk of overtraining in one specific area.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	WEIGHTS: [
		"When starting out try doing the same set of moves two or three times a week to build a basic level of fitness. ",
		"If you're new to weight lifting, you can start with just your bodyweight.",
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Try and mix up your routine. Try other sports and exercises to reduce the risk of overtraining in one specific area.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	CRICKET: [
		"Stay calm while you bat ",
		"Follow through with your swing, to hit the ball further. ",
		"If you spend a lot of time bating, take some time to rest at least a few days a week. Those things are heavy. ",
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Try and mix up your routine. Try other sports and exercises to reduce the risk of overtraining in one specific area.",
		"Did you know that the most common sports injuries include Ankle sprain, Groin pull, Hamstring strain, Shin splints, and knee injury. By warming up and stretching you can help to lower the risk of having such injuries. ",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	BOX: [
		"Take boxing classes to help you improve your technique by receiving expert guidance and instruction ",
		"Try and mix up your routine. Try other sports and exercises to reduce the risk of overtraining in one specific area.",
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	KAYAK: [
		"Try and mix up your routine. Try other sports and exercises to reduce the risk of overtraining in one specific area.",
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	SURF: [
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	FRISBEE: [
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	CYCLE: [
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	GARDENING: [
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	YOGA: [
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Yoga can help you to become more mindfull, happy and reduce stress. I hope it does for you today. ",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	PADDLEBOARD: [
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Do it right. Try to get the technique right from the beginning, to ensure you are using your muscles correctly.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	HIKE: [
		"Try and mix up your routine. Try other sports and exercises to reduce the risk of overtraining in one specific area.",
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Do it right. Try to get the technique right from the beginning, to ensure you are using your muscles correctly.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	CLIMBING: [
		"Try and mix up your routine. Try other sports and exercises to reduce the risk of overtraining in one specific area.",
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Do it right. Try to get the technique right from the beginning, to ensure you are using your muscles correctly.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	CROSSTRAIN: [
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	HORSERIDE: [
		"Try and mix up your routine. Try other sports and exercises to reduce the risk of overtraining in one specific area.",
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	],
	SKATE: [
		"Try and mix up your routine. Try other sports and exercises to reduce the risk of overtraining in one specific area.",
		"Warm up and cool down. Try slow stretches and go through the motions of your sport or activity before starting. Cool down with slow stretching.",
		"Pace yourself. Have at least one recovery day each week to rest. ",
		"Strap or tape. If a joint is prone to injury, consider strapping or taping it before exercising. Even better, see an exercise physiologist or physiotherapist to obtain a program to strengthen the injured area and get advice on proper taping techniques.",
		"Stay hydrated. You can lose around one and a half litres of fluid for every hour of exercise; so drink water before, during and after exercise.",
		"It’s just as important to stretch after exercise. When you’re done with any type of exercise or workout, take just a few minutes to stretch out your muscles. Think about it as a warm-down. Stretching after practice will help you loosen up, and let your body repair for your next workout. You’ll feel great for your next practice!",
		"Be weather aware. Take it easier in hot weather and wear clothing and sunscreen to protect yourself from the elements.",
		"Check your gear. Make sure your shoes and equipment fit properly and are right for the activity. Look after your equipment and check it regularly for safety."
	]
};

module.exports = TipStore;
