const dialogues = {
    granny: {
        messages: [
            {
                text: "Hello, sweetheart!",
                event: false
            },
            {
              text: "I was just thinking about you!",
              event: true,
              options: [
                "Hi, Granny! Thinking good things, I hope?",
                "Hey, Granny! What were you thinking about?"
              ]
            },
            {
              text: "Oh, of course! I was remembering how much you loved the jam I used to make.",
              event: true,
              options: [
                "Your strawberry jam? It's the best!",
                "Oh, that jam is legendary! Are you making more?"
              ]
            },
            {
              text: "I sure am! I’ve got a fresh batch cooling in the kitchen right now.",
              event: true,
              options: [
                "Can I come and taste it?",
                "Is there a spoonful with my name on it?"
              ]
            },
            {
              text: "Of course, darling! There’s always a special jar just for you.",
              event: false
            },
            {
              text: "By the way, do you still love apple pie as much as you used to?",
              event: true,
              options: [
                "Always, Granny! Why? Are you baking one?",
                "Absolutely! Is there one in the oven?"
              ]
            },
            {
              text: "You know me too well! It’s cooling by the window.",
              event: false
            },
            {
              text: "Oh! And I found some old photo albums yesterday.",
              event: true,
              options: [
                "Really? Can we look at them together?",
                "Oh, that sounds fun! Can we go through them?"
              ]
            },
            {
              text: "I was hoping you'd say that. There are some adorable pictures of you as a baby!",
              event: false
            },
            {
              text: "Have you been eating enough, my dear?",
              event: true,
              options: [
                "I’ve been trying, but nothing beats your cooking.",
                "I’m doing my best, but your food spoils me, Granny!"
              ]
            },
            {
              text: "That’s what I like to hear. I’ll pack you some leftovers when you visit.",
              event: false
            },
            {
              text: "Oh, and don’t forget—it’s your cousin’s birthday next week!",
              event: true,
              options: [
                "Thanks for the reminder, Granny. I’ll get them a gift.",
                "Oh, I nearly forgot! Thanks for telling me, Granny."
              ]
            },
            {
              text: "You’re such a thoughtful boy. They’ll love whatever you pick.",
              event: false
            },
            {
              text: "One last thing—I’ve been trying to figure out how to text better on my phone.",
              event: true,
              options: [
                "I can teach you! It’s pretty easy once you get the hang of it.",
                "Let me help you! It’s actually fun once you get used to it."
              ]
            },
            {
              text: "You’re such a patient teacher. Thank you, darling. ❤️",
              event: false
            },
            {
              text: "Now, come over soon, okay? I miss having you around.",
              event: true,
              options: [
                "I’ll be there soon, Granny. Love you!",
                "I miss you too, Granny. I’ll visit as soon as I can."
              ]
            },
            {
              text: "Love you too, my sweet boy. Can’t wait to see you! 😊",
              event: false
            }
          ],              

        firstMessageOffset: 2,
        messageInterval: 2
    },


    tyler: {
        messages: [
            {
              text: "Yo, guess what? I had football practice today!",
              event: false
            },
            {
              text: "And you won't believe what happened!",
              event: true,
              options: [
                "Let me guess... you scored a goal and became the hero?",
                "What happened?"
              ]
            },
            {
              text: "Jessica was there!",
              event: false
            },
            {
              text: "Yeah, she joined us for practice.",
              event: false
            },
            {
              text: "And when I went to kick the ball...",
              event: false
            },
            {
              text: "I tripped and fell straight on my bum!",
              event: true,
              options: [
                "LMAO!!! Dude, that’s epic!",
                "LOL, that’s hilarious!"
              ]
            },
            {
              text: "I was totally embarrassed, but hey, at least I made everyone laugh!",
              event: false
            },
            {
              text: "And then I tried to act like I meant to do it, but…",
              event: false
            },
            {
              text: "the ground had other plans for me.",
              event: true,
              options: [
                "Haha, yeah, that’s your signature move now!",
                "Classic move, bro. Totally believable."
              ]
            },
            {
              text: "For real, I think I’ll be known as 'The Bum-Kicker' from now on!",
              event: true,
              options: [
                "I’ll make sure to spread the legend of The Bum-Kicker!",
                "I’m definitely gonna call you that from now on."
              ]
            },
            {
              text: "😂 Just wait until next practice. I’ll be back and better than ever.",
              event: false
            }
          ],
        firstMessageOffset: 5,
        messageInterval: 3
    },
    summer: {
        messages: [
            {
                text: "Hey, so I have a date tonight!",
                event: false
            },
            {
                text: "And I have no idea what to wear…",
                event: true,
                options: [
                "Wow, that's awesome! Is it casual or fancy?",
                "Ooh, exciting! What kind of date is it?"
                ]
            },
            {
                text: "It’s a casual dinner, but I still want to look cute.",
                event: false
            },
            {
                text: "I’ve got a few options, but I can’t decide!",
                event: false
            },
            {
                text: "Should I go with the cute red dress or something more chill, like this blue dress?",
                event: true,
                options: [
                "I say go for the red dress! It’s bold and perfect for a date!",
                "Blue dress, 100%! You’ll totally stand out."
                ]
            },
            {
                text: "Yeah, I was thinking the same thing! But…",
                event: false
            },
            {
                text: "I’m worried it’s too much.",
                event: false
            },
            {
                text: "What if I look overdressed?",
                event: true,
                options: [
                "You can never go wrong with a dress. It’s always classy!",
                "Trust me, you won’t! You’ll look amazing and confident."
                ]
            },
            {
                text: "True, true.",
                event: false
            },
            {
                text: "Alright, I’ll go with this dress then!",
                event: false
            },
            {
                text: "Now, what about shoes?",
                event: true,
                options: [
                "Heels for sure! They’ll make the outfit pop!",
                "Definitely sneakers, if you’re feeling it!"
                ]
            },

            {
                text: "Haha, okay!",
                event: false
            },
            {
                text: "Thanks for helping me decide!",
                event: true,
                options: [
                "Have fun and knock his socks off!",
                "You’re gonna look fabulous, I just know it!"
                ]
            }
            ],
        firstMessageOffset: 2,
        messageInterval: 1.5
    }

};

export { dialogues };
