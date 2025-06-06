// To build GameLevels, each contains GameObjects from below imports
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';
import Quiz from './Quiz.js';
import GameControl from './GameControl.js';
import GameLevelStarWars from './GameLevelStarWars.js';
import GameLevelMC from './GameLevelMC.js';
import DialogueSystem from './DialogueSystem.js';
import GameLevelForest from './GameLevelForest.js';

class GameLevelBasement {
  constructor(gameEnv) {
    // Values dependent on this.gameEnv.create()
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    // Background data
    const image_src_basement = path + "/images/gamify/basement.png"; // be sure to include the path
    const image_data_basement = {
        name: 'basement',
        greeting: "Where are you? Your head hurts so much. Who are these people surrounding me?",
        src: image_src_basement,
        pixels: {height: 675, width: 1200}
    };


    // Player data for Main Character
    const sprite_src_degen = path + "/images/gamify/degen.png"; // be sure to include the path
    const DEGEN_SCALE_FACTOR = 7;
    const sprite_data_degen = {
        id: 'Degen',
        greeting: "I don't remember my name..but I remember a lot of people around me used to call me degen. I guess that's what I'll be called for now.",
        src: sprite_src_degen,
        SCALE_FACTOR: DEGEN_SCALE_FACTOR,  // Adjust this based on your scaling needs
        STEP_FACTOR: 250,
        ANIMATION_RATE: 20,
        INIT_POSITION: { x: 0, y: height - (height/DEGEN_SCALE_FACTOR) }, 
        pixels: {height: 600, width: 520},
        orientation: {rows: 4, columns: 4 },
        down: {row: 0, start: 0, columns: 4 },
        downRight: {row: 1, start: 0, columns: 4, rotate: Math.PI/16 },
        downLeft: {row: 2, start: 0, columns: 4, rotate: -Math.PI/16 },
        left: {row: 2, start: 0, columns: 4 },
        right: {row: 1, start: 0, columns: 4 },
        up: {row: 3, start: 0, columns: 4 },
        upLeft: {row: 2, start: 0, columns: 4, rotate: Math.PI/16 },
        upRight: {row: 1, start: 0, columns: 4, rotate: -Math.PI/16 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
    };

     // Conversation flow for Asaka
    const conversationFlowAsaka = {
      start: {
        question: "Do you remember your name?",
        answers: {
          "a. No.": "no",
          "b. Yes.": "yes"
        }
      },
      //string of possible conversaiton when chosen: no
      no: {
        question: "What do you remember?",
        answers: {
          "a. Nothing.": "nothing",
          "b. People seem to call me degen.": "degen"
        }
      },
      nothing: {
        question: "Okay. So, there would be no point in asking you how you got here, right?",
        answers: {
          "a. I suppose not.": "not",
          "b. Wait, I still want help with getting out of here. Will you tell me how to leave this place?": "help"
        }
      },
      not: {
        question: "Well then. I will leave you alone. ( Asaka stops talking to you for the rest of your time in the basement.)",
        answers: {
          "End. You have achieved bad ending six.": "badendingsix",
        }
      },
      //good ending three : youre not slow !! 
      help: {
        question: "Ah. If that's the case, I can help. Just trying ESCaping this place.",
        answers: {
          "a. That's .. okay, then. I'll figure it out somehow.": "goodendingthree",
          "b. What the skibidi is that supposed to mean? Escaping? Do you think I haven't already tried that?": "rude"
        }
      },
      //bad ending six : youre a bit slow 
      rude: {
        question: "No, not escaping ES- you know what? Nevermind. ( Asaka turns away and ignores you. )",
        answers: {
          "End. You have achieved bad ending six.": "badendingsix"
        }
      },
      degen: {
        question: "So you want to be called Degen? Alright, Degen. Do you know how you got here?",
        answers: {
          "a. No. And I don't want to be here. Help me get out.": "getout",
          "b. Of course! I entered a different dimension and it ended up bringing me here. What else could've happened?": "dimension"
        }
      },
      //good ending four : haha get it?
      getout: {
        question: "Well, just ESCape.",
        answers: {
          "What? What do you mean ESC.. ohhhh. ( Press ESC once you end this conversation. ) ": "goodendingfour",
        }
      },
      dimension: {
        question: "A different dimension? You're joking, right? ( Asaka frowns and ignore everything else you have to say, thinking you're insane. )",
        answers: {
          "a. End. You have achieved bad ending seven.": "badendingseven",
        }
      },
      //string of possible conversation when chosen: yes
      yes: {
        question: "What is it?",
        answers: {
          "a. Broski Moski": "broski",
          "b. I've heard people call me degen before, so I guess that's my name.": "name"
        }
      },
      broski: {
        question: "I seriously doubt that your name is Broski Moski. But anyhow, do you know how you got here?",
        answers: {
          "a. No.": "noidea",
          "b. Yes.": "sure"
        }
      },
      noidea: {
        question: "Well.. if that's the case.. would you like some help getting out of here?",
        answers: {
          "a. Yes. Please.": "please",
          "b. No. I don't get help from some female..": "ew"
        }
      },
      //Bad ending one : ew 
      ew: {
        question: "What a disappointment.. you're never getting out of here. ( Asaka ends the conversation. What a terrible response. )",
        answers: {
          "End. You have achieved bad ending one. ( Why did you even choose that option? )":"BadendingOne"
        }
      },
      // Good ending one : giving it a try 
      please:{
        question: "Have you tried just.. ESCaping out of the basement?",
        answers: {
          "a. No. Why would I ever try that? That's terrible information.": "terrible",
          "b. I haven't thought about that. Let me give it a try! ( When out of the conversation, press ESC. )": "endingOne"
        }
      },
      //Bad ending two : reject info 
      terrible:{
        question: "Fine. Do not accept my help. But don't say I didn't try to help. ( Asaka stops talking to you. )",
        answers: {
          "End. You have achieved bad ending two.":"BadEndingTwo"
        }
      },
      name: {
        question: "I see. So, Degen. How did you get here?",
        answers: {
          "a. I rode on a unicorn and somehow ended up here!!": "unicorn",
          "b. I'm really not sure. Could you help me get out?": "notsure"
        }
      },
      // Bad Ending Three : A unicorn?
      unicorn: {
        question: "Oh no.. I believe you're too far gone. ( Asaka turns away, disappointed to have even started a conversation with you. )",
        answers: {
          "End. You have achieved bad ending three.": "BadEndingThree"
        }
      },
      //good ending two : odd, but okay!
      notsure: {
        question: "Try ESCaping out of here. It works wonders.",
        answers: {
          "What odd advice.. but I will give it a try. ( Press ESC once out of the conversation)": "GoodEndingTwo"
        }
      },
      sure: {
        question: "Then, do you mind telling me how you got here?",
        answers: {
          "a. Truthfully, I drank a potion and I was magically teleported here.": "potion",
          "b. Okay, I lied, I don't know how I got here. Can you help me get out?": "lied"
        }
      },
      //bad ending four
      potion: {
        question: "I'm afraid you're too insane to understand the rest of my advice. ( Asaka stops talking to you, cringing as you walk away. )",
        answers: {
          "End. You have achieved bad ending four.": "BadEndingFour",
        }
      },
      //bad ending five 
      lied: {
        question: "Of course I won't, you lied to me! Why would you even lie in the first place? ( Asaka shakes her head and stops talking to you. )",
        answers: {
          "End. You have achieved bad ending five": "BadEndingFive",
        }
      },
      // Add more conversation nodes as needed
    };// Conversation class for Asaka 
class Conversation {
  constructor(flow) {
    this.flow = flow;
    this.currentNode = "start";
  }

  getCurrentQuestion() {
    return this.flow[this.currentNode].question;
  }

  getCurrentAnswers() {
    return Object.keys(this.flow[this.currentNode].answers);
  }

  answerQuestion(answer) {
    const nextNode = this.flow[this.currentNode].answers[answer];
    if (nextNode) {
      this.currentNode = nextNode;
    }
  }
}

    // NPC data for Asaka
    const sprite_src_asaka = path + "/images/gamify/asaka.png"; // be sure to include the path
    const sprite_greet_asaka = "You don't belong here, do you?                                                       ( Press e to interact with Asaka, click your answer and press e again to continue the interaction )";
    const sprite_data_asaka = {
        id: 'Asaka',
        greeting: sprite_greet_asaka,
        src: sprite_src_asaka,
        SCALE_FACTOR: 5,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 50,
        pixels: {height: 316, width: 189},
        INIT_POSITION: { x: (width / 2), y: (height / 1.7)},
        orientation: {rows: 4, columns: 3 },
        down: {row: 0, start: 0, columns: 3 },  // This is the stationary npc, down is default 
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        conversation: new Conversation(conversationFlowAsaka),
        reaction: function() {
          alert(sprite_greet_asaka);
        },
        interact: function() {
          const conversation = sprite_data_asaka.conversation;
          const question = conversation.getCurrentQuestion();
          const answers = conversation.getCurrentAnswers();
          const conversationPanel = document.getElementById('conversationPanel');
          const conversationQuestion = document.getElementById('conversationQuestion');
          const conversationAnswers = document.getElementById('conversationAnswers');

          conversationQuestion.innerText = question;
          conversationAnswers.innerHTML = '';

          answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.onclick = () => {
              conversation.answerQuestion(answer);
              conversationPanel.style.display = 'none';
            };
            conversationAnswers.appendChild(button);
          });

          conversationPanel.style.display = 'block';
        }
    };

      // NPC data for Miku
      const sprite_src_miku = path + "/images/gamify/miku.png"; // be sure to include the path
      const sprite_greet_miku = "OMG HI UWU MY NAME IS MIKU I'M SO SUPER DUPER STOKED TO MEET YOU!";
      const sprite_data_miku = {
        id: 'Miku',
        greeting: sprite_greet_miku,
        src: sprite_src_miku,
        SCALE_FACTOR: 5,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 50,
        pixels: {height: 316, width: 189},
        INIT_POSITION: { x: (width / 12), y: (height / 1.8)},
        orientation: {rows: 4, columns: 3 },
        down: {row: 0, start: 0, columns: 3 },  // This is the stationary npc, down is default 
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.1 },
        dialogues: [
          "Hi there! I'm Miku, your virtual idol! 🎤✨",
          "Vocaloid is a singing voice synthesizer software developed by Yamaha Corporation. It allows users to input melodies and lyrics, which are then sung by virtual singers known as Vocaloids. These voices are created using vocal samples from real singers, which are then processed and tuned to produce a synthetic, yet highly customizable, singing voice.",
          "My software was first introduced in 2004, but it wasn't until the release of Hatsune Miku in 2007 that Vocaloid truly exploded in popularity. Since then, it has become a massive part of internet culture, inspiring music producers, animators, and artists worldwide.",
          "Vocaloid has evolved significantly over the years, with each new version introducing improvements in voice quality, usability, and features.",
          "Vocaloid 3 (2011) introduced greater realism in voices and multiple language support.",
          "Vocaloid 4 (2014) added new functions like growl effects and pitch control.",
          "Vocaloid 5 (2018) improved usability, adding greater control over dynamics and vocal expression.",
          "Crypton Future Media later moved on from Vocaloid to develop Piapro Studio, which now powers Miku and other Crypton Vocaloids.",
          "Vocaloid has a wide range of characters, each with unique voices and personalities. The most famous ones include:",
          "Hatsune Miku The face of Vocaloid, known for her turquoise hair and futuristic style.",
        
          ],
          reaction: function() {
              // Don't show any reaction dialogue - this prevents the first alert
              // The interact function will handle all dialogue instead
          },
          interact: function() {
              // Clear any existing dialogue first to prevent duplicates
              if (this.dialogueSystem && this.dialogueSystem.isDialogueOpen()) {
                  this.dialogueSystem.closeDialogue();
              }
              
              // Create a new dialogue system if needed
              if (!this.dialogueSystem) {
                  this.dialogueSystem = new DialogueSystem();
              }
              
              // Show portal dialogue with buttons
              this.dialogueSystem.showDialogue(
                  "Why do you want to leave me?",
                  "Escape to the forest",
                  this.spriteData.src
              );
              
              // Add buttons directly to the dialogue
              this.dialogueSystem.addButtons([
                  {
                      text: "Escape",
                      primary: true,
                      action: () => {
                          this.dialogueSystem.closeDialogue();
                          
                          // Clean up the current game state
                          if (gameEnv && gameEnv.gameControl) {
                              // Store reference to the current game control
                              const gameControl = gameEnv.gameControl;
                              
                              // Create fade overlay for transition
                              const fadeOverlay = document.createElement('div');
                              Object.assign(fadeOverlay.style, {
                                  position: 'fixed',
                                  top: '0',
                                  left: '0',
                                  width: '100%',
                                  height: '100%',
                                  backgroundColor: '#000',
                                  opacity: '0',
                                  transition: 'opacity 1s ease-in-out',
                                  zIndex: '9999'
                              });
                              document.body.appendChild(fadeOverlay);
                              
                              console.log("You leave Miku behind, ready to escape the basement.");
                              
                              // Fade in
                              requestAnimationFrame(() => {
                                  fadeOverlay.style.opacity = '1';
                                  
                                  // After fade in, transition to End level
                                  setTimeout(() => {
                                      // Clean up current level properly
                                      if (gameControl.currentLevel) {
                                          // Properly destroy the current level
                                          console.log("Destroying current level...");
                                          gameControl.currentLevel.destroy();
                                          
                                          // Force cleanup of any remaining canvases
                                          const gameContainer = document.getElementById('gameContainer');
                                          const oldCanvases = gameContainer.querySelectorAll('canvas:not(#gameCanvas)');
                                          oldCanvases.forEach(canvas => {
                                              console.log("Removing old canvas:", canvas.id);
                                              canvas.parentNode.removeChild(canvas);
                                          });
                                      }
                                      
                                      console.log("To the forest...");
                                      
                                      // IMPORTANT: Store the original level classes for return journey
                                      gameControl._originalLevelClasses = gameControl.levelClasses;
                                      
                                      
                                      gameControl.levelClasses = [GameLevelForest];
                                      gameControl.currentLevelIndex = 0;
                                      
                                      // Make sure game is not paused
                                      gameControl.isPaused = false;
                                      
                                      // Start the End level with the same control
                                      console.log("To the forest...");
                                      gameControl.transitionToLevel();
                                      
                                      // Fade out overlay
                                      setTimeout(() => {
                                          fadeOverlay.style.opacity = '0';
                                          setTimeout(() => {
                                              document.body.removeChild(fadeOverlay);
                                          }, 1000);
                                      }, 500);
                                  }, 1000);
                              });
                          }
                      }
                  },
                  {
                      text: "Not Ready",
                      action: () => {
                          this.dialogueSystem.closeDialogue();
                      }
                  }
              ]);
          }
      }

      // Nezuko NPC sprite data
  const sprite_src_nezuko = path + "/images/gamify/nezuko.png"; // be sure to include the path
  const sprite_greet_nezuko = "I've never seen you before. Are you lost? Well, even if you are.. I don't think I'm going to help you get out of here."
  const sprite_data_nezuko = {
    id: 'Nezuko',
    greeting: sprite_greet_nezuko,
    src: sprite_src_nezuko,
    SCALE_FACTOR: 5,
    ANIMATION_RATE: 50,
    pixels: {height: 316, width: 189},
    INIT_POSITION: { x: (width / 1.3), y: (height / 1.3)},
    orientation: {rows: 4, columns: 3 },
    down: {row: 0, start: 0, columns: 3 },
    hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
    dialogues: [
      "Hi there! I'm Nezuko, your virtual demon! 🐾✨",
      "I was created by the talented team at Open Coding Society to bring a unique gaming experience to life.",
      "My character is inspired by the popular anime series 'Demon Slayer', where I play the role of a demon with a strong will and protective instincts.",
      "In the game, I can help you navigate through challenges and provide hints to overcome obstacles.",
      "My abilities include enhanced strength, agility, and the power to heal quickly.",
      "I can also assist you in battles against other demons and enemies you encounter.",
      "Remember, teamwork is key! Together, we can conquer any challenge that comes our way.",
      "Let's embark on this adventure together and make it an unforgettable experience!"
    ],
          reaction: function() {
              // Use dialogue system instead of alert
              if (this.dialogueSystem) {
                  this.showReactionDialogue();
              } else {
                  console.log(sprite_greet_nezuko);
              }
          },
          interact: function() {
              // Show random dialogue message
              if (this.dialogueSystem) {
                  this.showRandomDialogue();
              }
          }
      };


    // Store all NPC sprite data in an array
    this.npcsData = [
      // NPCs
      sprite_data_nezuko,
      sprite_data_asaka,
      sprite_data_miku,
    ];

    this.classes = [
      { class: Background, data: image_data_basement },
      { class: Player, data: sprite_data_degen },
      { class: Npc, data: sprite_data_nezuko },
      { class: Npc, data: sprite_data_asaka },
      { class: Npc, data: sprite_data_miku },
    ];
  }
}

export default GameLevelBasement;