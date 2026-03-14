import { useState, useEffect } from "react";


const emotionData = [
  {
    id: "shame",
    label: "Shame",
    valence: "dark",
    hue: "#1a1a2e",
    accent: "#1c1c1c",
    description: "A core, painful sense that one is fundamentally flawed, defective, or unworthy as a person.",
    feelings: [
      { name: "Humiliated", definition: "The experience of being degraded or made to feel inferior, often in front of others or through one's own internal witness.", sample: "Your face burns. You want to disappear into the floor. A voice inside says everyone can see exactly what is wrong with you." },
      { name: "Mortified", definition: "Humiliation so intense it feels physically unbearable — the self wants to cease existing in this moment.", sample: "It happened in front of everyone. You can't think past it. Your whole body is the mistake." },
      { name: "Self-Loathing", definition: "An intense, ongoing dislike or disgust directed at oneself — one's character, actions, or very existence.", sample: "Looking in the mirror feels like confronting an enemy. You replay what you said or did and feel a deep revulsion." },
      { name: "Worthless", definition: "A pervasive sense that one has no value, that one's presence or contribution does not matter.", sample: "You sit in a room full of people and feel invisible — not unseen by others, but genuinely without substance." },
      { name: "Defective", definition: "A belief that something is fundamentally broken or wrong inside oneself — not just behaviour, but core identity.", sample: "Everyone else seems to know how to do this. You wonder if you're missing something essential that other people were born with." },
      { name: "Damaged", definition: "A sense that past experiences have permanently altered or diminished who one is — that repair is impossible.", sample: "You look at who you were before and feel the distance. Something was taken and it hasn't come back." },
      { name: "Embarrassed", definition: "A milder, socially-triggered version of shame, arising when one's perceived failure or awkwardness is exposed.", sample: "You trip in public. Your cheeks flush. You replay it on repeat, certain everyone noticed and judged." },
      { name: "Disgraced", definition: "Shame that has become public — the sense that one's failures or flaws are now known and judged by others.", sample: "You walk in and feel the shift in the room. Whether real or imagined, you are certain everyone knows." },
      { name: "Inadequate", definition: "A felt sense of being not enough — insufficient in ability, worth, or presence relative to what is required.", sample: "You sit at the table and feel like a fraud. Everyone else belongs here. You're waiting to be found out." },
      { name: "Exposed", definition: "The vulnerable feeling of being seen in one's weakness, failure, or need — before one is ready or willing.", sample: "Something slipped. Now they know more than you meant to show. You feel stripped of the protection of not being seen." },
      { name: "Inferior", definition: "A ranking shame — the persistent sense of being less than others in status, competence, or worth.", sample: "You compare and it always comes out the same way. They have something you don't. They are something you're not." },
      { name: "Undeserving", definition: "The belief that good things — love, success, rest — are not legitimately one's own to have.", sample: "Something good happened and your first move was to find a reason it doesn't count or won't last." },
      { name: "Dirty", definition: "A shame state in which one feels morally or spiritually stained — as if something wrong has marked one permanently.", sample: "You can't quite shake the feeling that you carry something others would recoil from if they knew." },
      { name: "Tainted", definition: "Similar to feeling dirty but with a sense of contamination from outside — something done to you has altered you.", sample: "It wasn't your fault. You know that. But the feeling of being marked by it doesn't care what you know." },
      { name: "Abnormal", definition: "The shame of feeling fundamentally different from others in a way that is wrong rather than simply unique.", sample: "You watch the way other people do ordinary things and wonder why it's so hard for you. Something in you must be off." },
      { name: "Unlovable", definition: "The deep shame-belief that one is constitutionally incapable of being genuinely loved — that real closeness would reveal the truth.", sample: "They say they love you. You hear it and something underneath says: not if they really knew. Not the real you." },
      { name: "Pathetic", definition: "A harsh self-judgment — contempt directed inward at one's own weakness, need, or failure to manage.", sample: "You needed something and part of you immediately sneered at yourself for it. Pull it together. Don't be this." },
      { name: "Ridiculous", definition: "The shame of having been foolish, naive, or absurd — of having exposed oneself to mockery or dismissal.", sample: "You thought it mattered. You cared openly. Now it feels foolish. Of course it turned out this way." },
      { name: "Overlooked", definition: "The mild shame of being consistently passed over — not dramatic rejection, but a quiet chronic invisibility.", sample: "They chose someone else. Again. Not cruelly — you just weren't the one they thought of. You never are." },
      { name: "Second-Rate", definition: "The shame of being perpetually almost-good-enough — close to acceptable, never quite there.", sample: "You did well. Not well enough. There's always a gap between where you are and where you'd need to be to actually count." },
      { name: "Self-Conscious", definition: "An uncomfortable hyperawareness of how one appears to others — performing and monitoring simultaneously.", sample: "You can't just be in the room. You're watching yourself be in the room, evaluating every move in real time." },
      { name: "Impure", definition: "A moral or spiritual shame — a sense that one's thoughts, desires, or history make one unworthy of good things.", sample: "You know what you've thought. What you've done. There's a part of you that believes you don't get to ask for clean." },
      { name: "Abased", definition: "A state of having been reduced — by others or by circumstance — to a lower position of worth or dignity.", sample: "You were treated as less than. And somewhere along the way, you started treating yourself that way too." },
      { name: "Insignificant", definition: "The shame of mattering very little — not hated, not rejected, simply not relevant enough to register.", sample: "You left the room and no one noticed. You could have not come and it would have been the same. You wonder why you try." },
      { name: "Foolish", definition: "Shame arising from having misjudged, been naive, or acted without sufficient caution.", sample: "You should have known better. That's what stings most — not what happened, but that you walked right into it." },
      { name: "Clumsy", definition: "A physical or social shame — the feeling of being ungraceful, awkward, out of sync with what the situation requires.", sample: "You said the wrong thing at the wrong time. You knocked it over. You couldn't find the word. You never find the word." },
      { name: "Spineless", definition: "Self-directed shame for having failed to stand up, speak out, or hold a position under pressure.", sample: "You said nothing. You had the chance and you let it pass. You call it being diplomatic. You know it wasn't." },
      { name: "Inept", definition: "The shame of failing at a task or skill — of performing below the standard one holds for oneself.", sample: "Everyone else seems to manage this. You can't figure it out. The incompetence is yours and it's visible." },
      { name: "Reprehensible", definition: "A sharp, moral self-condemnation — the belief that one's actions or impulses are genuinely bad, deserving of condemnation.", sample: "You know what you did. You don't have a defence. You stand in front of your own judgment and it doesn't go well." },
      { name: "Disrespected", definition: "The shame-adjacent pain of having one's worth or dignity treated as lesser — by others or by how one has allowed oneself to be treated.", sample: "They spoke to you as if you didn't matter. And you let them. That second part is what stays with you." }
    ]
  },
  {
    id: "fear",
    label: "Fear",
    valence: "dark",
    hue: "#2d1b4e",
    accent: "#3d2b6b",
    description: "An alerting emotion signalling perceived threat — to safety, belonging, or selfhood.",
    feelings: [
      { name: "Dread", definition: "A slow, heavy anticipation of something bad — often undefined, looming, without a clear source.", sample: "You wake at 3 a.m. with a weight on your chest. Nothing specific is wrong, but something feels about to go very wrong." },
      { name: "Terror", definition: "An acute, overwhelming fear response that bypasses rational thought and floods the body.", sample: "Your heart pounds so hard you hear it. Your limbs either freeze or bolt. The world narrows to a single point of threat." },
      { name: "Anxious", definition: "Persistent, low-grade fear often disconnected from a specific trigger — the body and mind on perpetual alert.", sample: "Your stomach is tight before you even get out of bed. You rehearse conversations that haven't happened. Worst-case scenarios run on a loop." },
      { name: "Panicked", definition: "A sudden surge of fear so intense it produces physical symptoms — racing heart, shortness of breath, derealization.", sample: "It hits without warning. Your chest constricts. You can't catch your breath. Your mind screams danger even though you're standing in a grocery store." },
      { name: "Worried", definition: "Repetitive, ruminative mental activity focused on potential negative outcomes, often without resolution.", sample: "You check your phone for the third time in five minutes. You run through the scenario again. And again. The what-ifs won't stop." },
      { name: "Insecure", definition: "A chronic uncertainty about one's value, safety, or belonging — a baseline assumption that the ground may shift.", sample: "Even when things are good, you're waiting. You don't quite trust it. The good feels temporary; the bad feels like the truth." },
      { name: "Overwhelmed", definition: "A fear-adjacent state in which demands exceed capacity — the system floods and shuts down or scatters.", sample: "There's too much. You don't know where to start. Instead of starting, you freeze, or you do everything badly at once." },
      { name: "Vulnerable", definition: "The felt experience of being open to harm — emotionally exposed, without sufficient protection or armour.", sample: "You said the true thing. Now you wait. Every second before they respond is a second of raw, unprotected exposure." },
      { name: "Powerless", definition: "The fear-state of having no agency — circumstances control outcomes and nothing one does changes them.", sample: "You've tried every option you can think of. Nothing moves. You are at the mercy of something larger than your ability to act." },
      { name: "Foreboding", definition: "A quiet, persistent sense that something bad is coming — not panic, but a low hum of anticipated loss.", sample: "Things are fine. You know they're fine. But you can't stop scanning the horizon for what's about to go wrong." },
      { name: "Trapped", definition: "The fear of having no exit — circumstances, relationships, or internal states that feel inescapable.", sample: "You look at the situation from every angle. Every door is closed. The walls aren't moving but they feel closer than yesterday." },
      { name: "Threatened", definition: "The clear perception that something one values — safety, relationship, status — is under active attack.", sample: "Something shifted in the conversation and your whole body registered it before your mind did. This is not safe anymore." },
      { name: "Paranoid", definition: "Fear that has turned toward suspicion — a belief that threat is hidden, intentional, or coming from trusted sources.", sample: "You read the message three times looking for what they really meant. You're certain there's something underneath. There has to be." },
      { name: "Timid", definition: "A gentle, habitual fear of stepping forward — the shrinking back that has become a default posture.", sample: "You had something to say. You started to say it. You pulled back. It probably wasn't important enough anyway." },
      { name: "Skittish", definition: "An edgy, easily triggered fear response — the nervous system set to startle at small disturbances.", sample: "A door slams in another room and you feel it in your chest. You're always slightly braced. You don't know how to not be." },
      { name: "Cautious", definition: "Fear expressed as careful, measured holding-back — useful in real danger, limiting when danger has passed.", sample: "You check twice. You prepare for the worst. You don't fully commit until you're certain. You're never certain." },
      { name: "Nervous", definition: "An anticipatory fear state — unsettled, jittery, focused on a specific upcoming event or interaction.", sample: "Your hands are slightly unsteady. You keep checking the time. You've rehearsed it but you still don't feel ready." },
      { name: "Dreading", definition: "A specific form of dread directed at a known upcoming event — the feeling of walking toward something you don't want.", sample: "It's on the calendar. You see it every time you look. Part of you is already there, already enduring it." },
      { name: "Guarded", definition: "Fear expressed as protective withholding — keeping information, emotion, or access controlled to prevent harm.", sample: "You answer the question but not fully. You stay pleasant but not open. You've learned that open is how you get hurt." },
      { name: "Suspicious", definition: "A vigilant fear that others' intentions are not what they appear — that kindness may conceal harm.", sample: "They were nice to you and you immediately wondered why. What do they want. People don't just be nice." },
      { name: "Uneasy", definition: "A vague, low-level discomfort — the sense that something is slightly wrong without being able to name it.", sample: "The conversation was fine. The evening was fine. But you drove home with something unsettled sitting just behind your sternum." },
      { name: "Hesitant", definition: "Fear expressed as pause — the inability to move forward because moving forward feels dangerous.", sample: "You're standing at the edge of the decision. You can see what you need to do. Your feet won't go." },
      { name: "Frozen", definition: "An acute fear response in which action becomes impossible — the body goes still under threat.", sample: "You knew what to say. You knew what to do. And then you were just standing there, unable to produce anything at all." },
      { name: "Shaken", definition: "Fear that has passed but left its residue — the trembling that continues after the threat has gone.", sample: "It's over. You're safe. Your hands are still unsteady. Your body hasn't gotten the message yet." },
      { name: "Frantic", definition: "Fear expressed as disorganised, high-speed activity — doing everything at once as a way of managing the unmanageable.", sample: "You're moving fast. You're doing things. You're not sure any of them are the right things but stopping feels worse." },
      { name: "Cornered", definition: "The fear-state of having no available moves — threat from multiple directions, no escape route visible.", sample: "Every option leads somewhere you don't want to go. You keep running the scenarios. There's no clean way out of this." },
      { name: "Apprehensive", definition: "A moderate, forward-looking fear — not panic, but a sustained wariness about what is coming.", sample: "You're not catastrophising. You're just not okay with how this is likely to go. Something about it doesn't sit right." },
      { name: "Rattled", definition: "Fear that has disrupted one's composure — the unsettling of a normally steady internal state by a sudden shock.", sample: "Something happened and it got under your guard. You're still composed on the outside. The inside is a different story." },
      { name: "On Edge", definition: "A sustained state of low-level fear — hypervigilance that has become baseline, the nervous system unable to fully rest.", sample: "You haven't fully relaxed in longer than you can remember. You're always slightly braced for the thing that's coming." },
      { name: "Startled", definition: "A sudden reflexive fear response — the body reacting to unexpected input before the mind can assess it.", sample: "The sound was nothing. Your body didn't know that. Heart racing, muscles tensed — all of it before a single thought." },
      { name: "Wary", definition: "A sustained, low-grade watchfulness — the cautious monitoring of a person or situation felt to be potentially dangerous.", sample: "You're pleasant. You're even warm. But you're watching. You always watch. You learned to watch a long time ago." },
      { name: "Petrified", definition: "Fear so total it produces complete immobility — physical and mental, rooted to the spot.", sample: "There was nowhere to go and no way to move. You just stood there inside the fear, waiting for it to be over." },
      { name: "Spooked", definition: "A sudden onset of irrational or hard-to-explain fear — the atmosphere shifts and something animal in you responds.", sample: "Nothing happened. Nothing concrete. But the hairs went up and something in you said: something is wrong here." },
      { name: "Jittery", definition: "A physical restlessness driven by anxiety — the body unable to settle, in motion but without direction.", sample: "You keep moving. You can't sit still. You stand up, walk across the room, sit back down. Something needs to discharge." },
      { name: "Dreading Rejection", definition: "A specific fear focused on the anticipated pain of being turned away, unwanted, or deemed not enough.", sample: "You want to ask. You want to reach out. You've already played out how it ends. So you don't start." },
      { name: "Helpless", definition: "A fear state combined with lost agency — the sense that what is happening cannot be stopped, changed, or survived through any effort.", sample: "You tried. There was nothing to try. The thing was happening and you couldn't touch it. That's a particular kind of awful." }
    ]
  },
  {
    id: "anger",
    label: "Anger",
    valence: "dark",
    hue: "#2c1810",
    accent: "#7b2d2d",
    description: "An activating emotion signalling a boundary has been crossed, a wrong has occurred, or one's needs are being blocked.",
    feelings: [
      { name: "Rageful", definition: "Anger at its most intense — a flooding state where reason and proportion are overwhelmed by the force of the feeling.", sample: "Everything goes red. Your jaw is clenched, your hands are fists. Words come out you'll regret. The feeling is bigger than your body." },
      { name: "Resentful", definition: "Anger that has not been processed or expressed — hardened over time into bitterness toward a person or situation.", sample: "You smile at them in the meeting and hate that you have to. You keep a running tally of every slight. It's always just beneath the surface." },
      { name: "Bitter", definition: "Resentment that has calcified — old anger that has lost its heat but none of its weight, colouring how one sees the world.", sample: "You stopped expecting anything different a long time ago. The anger is still there. It just doesn't surprise you anymore." },
      { name: "Frustrated", definition: "A milder anger arising when progress is blocked, goals are thwarted, or efforts repeatedly fail.", sample: "You've explained it three times. You hit the same wall again. You exhale hard through your nose and feel the heat behind your eyes." },
      { name: "Contemptuous", definition: "Anger mixed with disgust and superiority — a dismissal of another person's worth or competence.", sample: "You watch them speak and feel nothing but a cold, quiet disdain. You've already decided they're beneath your time." },
      { name: "Irritable", definition: "A low-grade, chronic form of anger that makes a person reactive, short-fused, and easily provoked.", sample: "The noise bothers you more than it should. Someone's breathing is suddenly intolerable. Everything is slightly too much." },
      { name: "Outraged", definition: "Anger triggered by a perceived injustice — moral indignation that something deeply wrong has been done.", sample: "This isn't just about you. It's wrong. The heat in your chest isn't personal, it's principled — and it demands a response." },
      { name: "Indignant", definition: "Anger at being treated in a way that violates one's dignity or sense of what is deserved.", sample: "You were dismissed. Talked over. Treated as less than. The anger is clean and specific: that was not acceptable." },
      { name: "Seething", definition: "Anger held in and compressed — visible just beneath the surface, controlled but barely, building pressure.", sample: "You're not yelling. You're very still. But everything inside is boiling and the effort of containing it is exhausting." },
      { name: "Hostile", definition: "A sustained angry orientation toward others — a readiness for conflict that colours all interactions.", sample: "You walk in already defensive. You're looking for the thing that will confirm what you already expect: that this will go badly." },
      { name: "Furious", definition: "Intense anger that has fully taken hold — controlled enough to remain functional but burning hot throughout.", sample: "You're not out of control but you are absolutely not okay. Every word is measured. Every word costs you something." },
      { name: "Enraged", definition: "Anger that has overwhelmed restraint — the self flooded, reason suspended, the feeling in full command.", sample: "You said things. You did things. You won't be proud of any of it later. Right now you can't find the brake." },
      { name: "Livid", definition: "A specific shade of anger — cold, white, precise — that feels more dangerous than heat because it knows exactly what it wants.", sample: "You're not yelling. Your voice is very even. That's usually when people know to pay attention." },
      { name: "Annoyed", definition: "Mild, surface-level anger — the friction of a small wrong or repeated minor irritation.", sample: "It's not a big deal. You know that. But it happened again, and the small needle of it is sharper than it should be." },
      { name: "Exasperated", definition: "Anger combined with exhaustion — the feeling of having reached the end of one's patience after a sustained effort.", sample: "You've tried everything. You've been patient. You've explained. Nothing changes. You're done trying." },
      { name: "Provoked", definition: "Anger that was deliberately triggered — the feeling of having been pushed specifically to produce this reaction.", sample: "They knew exactly what they were doing. They wanted this reaction. And you gave it to them. That makes it worse." },
      { name: "Incensed", definition: "A sudden, sharp burst of anger at something witnessed or experienced as deeply wrong.", sample: "You heard what they said and something inside you ignited. That is not acceptable. That is not something you can let pass." },
      { name: "Vengeful", definition: "Anger that has become focused on retaliation — the desire to make someone pay for what they've done.", sample: "You're not just hurt. You want them to know what it feels like. You want there to be a cost." },
      { name: "Spiteful", definition: "A small, sharp anger expressed through deliberate harm — doing damage not from rage but from cold intent.", sample: "You could have let it go. You chose not to. The small cruelty of it satisfied something. You're not proud of that." },
      { name: "Sulky", definition: "Anger expressed through withdrawal and silence — punishing through absence rather than confrontation.", sample: "You're not saying anything. They can tell something is wrong. You're not ready to talk about it. That's the point." },
      { name: "Rebellious", definition: "Anger expressed as refusal — the energised push against authority, rules, or expectations felt as unjust.", sample: "You're not doing it. Not because you can't. Because you won't. And you feel very clear about that distinction." },
      { name: "Defiant", definition: "Anger held as a posture — a firm, deliberate refusal to comply, capitulate, or be diminished.", sample: "They can say what they want. You know what you know. You're not moving on this." },
      { name: "Aggressive", definition: "Anger expressed as forward force — the push into rather than away from, the impulse to make something happen.", sample: "You're moving toward it. The feeling is sharp and hot and it wants contact. You want to push back and make it land." },
      { name: "Scornful", definition: "Anger mixed with cold dismissiveness — a withering disregard for someone felt to be beneath consideration.", sample: "You don't even have heat for them anymore. Just a flat, quiet verdict: they are not worth your actual anger." },
      { name: "Explosive", definition: "Anger that has been stored and suddenly releases in a burst disproportionate to the immediate trigger.", sample: "It wasn't even about that. Something small happened and everything that had been building came out at once." },
      { name: "Disgruntled", definition: "A low-grade, chronic dissatisfaction that colours interactions — not acute anger, but a persistent complaint with how things are.", sample: "Nothing is right. The food is wrong, the weather is wrong, they're doing it wrong. You know you're being difficult. You can't stop." },
      { name: "Simmering", definition: "Anger that is active but not yet expressed — building, present, held beneath the surface.", sample: "It's in there. Has been for a while. You haven't said anything. But it's not gone. It's just waiting." },
      { name: "Dismissive", definition: "Anger expressed as a refusal to engage — treating someone or something as beneath the effort of a genuine response.", sample: "You could argue. You don't think they're worth it. The dismissal is the point." },
      { name: "Combative", definition: "A readiness to fight — arriving in a state of conflict-readiness before any conflict has actually started.", sample: "You walked in looking for an argument. Not consciously. But the set of your jaw and the shortness of your answers said it for you." },
      { name: "Wronged", definition: "The clear, clean feeling of having been treated unjustly — anger grounded in legitimate grievance.", sample: "This was done to you. That's not self-pity — it's accurate. And the feeling that follows accuracy isn't always calm." },
      { name: "Sore", definition: "A tender, easily aggravated form of anger — the bruised feeling that makes certain topics too sensitive to touch without reaction.", sample: "They hit the thing you've been trying not to think about. The reaction was bigger than the moment. The moment didn't know what it walked into." }
    ]
  },
  {
    id: "sadness",
    label: "Sadness",
    valence: "dark",
    hue: "#1c2b3a",
    accent: "#2c5f7a",
    description: "An emotion signalling loss — of a person, a possibility, a version of self, or something that mattered.",
    feelings: [
      { name: "Grieving", definition: "The deep, embodied process of mourning a significant loss — it moves in waves, not stages.", sample: "You're fine and then a song plays. The loss collapses over you again. Your chest is hollow and heavy at the same time." },
      { name: "Lonely", definition: "The ache of disconnection — feeling unseen, unknown, or separated from meaningful human contact.", sample: "You're surrounded by people and feel completely alone. No one here knows the real you. Maybe no one does." },
      { name: "Abandoned", definition: "The feeling that those who should have stayed have left — physically, emotionally, or both. A core wound in CEN.", sample: "They were supposed to be there. They weren't. Some part of you is still waiting in that room, wondering what you did wrong." },
      { name: "Rejected", definition: "The pain of being unwanted, turned away, or deemed not worth keeping by someone whose acceptance mattered.", sample: "They chose not to choose you. You tell yourself it doesn't matter. Your chest tells you differently." },
      { name: "Invisible", definition: "The sadness of being present but unseen — one's feelings, needs, or existence consistently overlooked.", sample: "You spoke and no one responded. You walked in and no one looked up. You start to wonder if you're actually there." },
      { name: "Neglected", definition: "The grief of needs that were never met — not from a single event, but from a persistent absence of care. Central to CEN.", sample: "There was no one moment you can point to. Just a long, quiet pattern of your needs not mattering enough to anyone." },
      { name: "Betrayed", definition: "Grief and hurt fused — the pain of trust that was broken by someone you believed in.", sample: "You trusted them with something real. They used it wrong, or left, or lied. The wound is specific: you let them in." },
      { name: "Longing", definition: "A persistent, aching desire for something or someone lost, absent, or never fully had.", sample: "You catch yourself thinking about it again. The wanting is old now. It doesn't surprise you, but it doesn't stop either." },
      { name: "Despairing", definition: "Sadness that has collapsed into hopelessness — a sense that nothing will improve or matter.", sample: "You stop making plans. What's the point. The future looks exactly like the present, except more tired." },
      { name: "Despondent", definition: "A heavy, low-energy sadness — not acute grief but a persistent sense of being weighed down with no relief in sight.", sample: "You go through the motions. You get up, do the things, come home. Nothing is actively wrong. Nothing is right either." },
      { name: "Disappointed", definition: "Sadness that arises when expectation meets reality and the gap between them is painful.", sample: "You'd let yourself hope. That was the mistake. Now the let-down sits in your chest like something swallowed wrong." },
      { name: "Empty", definition: "A sense of inner blankness or numbness — the absence of feeling, often a response to chronic emotional deprivation. Central to Jonice Webb's CEN framework.", sample: "You should feel something. You know that objectively. But there's nothing there — just a flat, quiet void where feeling should live." },
      { name: "Numb", definition: "An emotional shutdown — feelings that have been suppressed so long or so consistently that the signal no longer gets through.", sample: "Something happened that should have mattered. You waited for the feeling. It didn't come. You're not sure if that's better or worse." },
      { name: "Apathetic", definition: "A state of not caring — motivation, feeling, and investment all absent. Can be a protective response to repeated hurt.", sample: "You used to care about this. You're not sure when that stopped. Now it's just a thing that happens, and you watch it happen." },
      { name: "Depleted", definition: "Sadness that has drained resources — emotional, physical, and motivational reserves run dry from prolonged stress or grief.", sample: "You don't have anything left to give. Not to them, not to yourself. You're running on fumes and the tank has been empty for a while." },
      { name: "Dysphoric", definition: "A pervasive sense of unease, dissatisfaction, or distress with oneself or one's life — not a single feeling but a colouring of everything.", sample: "Nothing is specifically wrong. Everything feels slightly off. You can't name it. It's just the texture of most days." },
      { name: "Mournful", definition: "A quieter, more sustained form of grief — the ongoing relationship with what has been lost.", sample: "You're not crying. You're just aware of the absence. The shape of it. How it occupies space even now." },
      { name: "Heartbroken", definition: "Grief specific to the loss of love or deep attachment — the particular devastation of a broken intimate bond.", sample: "You built something with them. Or you thought you did. Now you move through the wreckage of what you thought was real." },
      { name: "Sorrowful", definition: "A deep, dignified sadness — sorrow doesn't rage or panic; it settles and endures.", sample: "The weight of it has been with you a long time. You carry it. You've learned to carry it. That doesn't make it lighter." },
      { name: "Melancholy", definition: "A reflective, low-grade sadness without a specific cause — a gentle persistent ache.", sample: "Autumn light does this. Old music does this. A quiet heaviness that isn't sharp but doesn't lift." },
      { name: "Discouraged", definition: "Sadness about one's efforts — the deflation that follows sustained trying without reward.", sample: "You tried hard. It didn't go the way you needed it to. You're not sure you have it in you to try that hard again." },
      { name: "Hopeless", definition: "The belief that the future holds nothing good — that effort is futile and change is not possible.", sample: "You've stopped imagining it being different. That mental image just doesn't come anymore. There's just what is." },
      { name: "Alienated", definition: "The sadness of fundamental disconnection — feeling that one exists outside of where others belong.", sample: "You watch the way they are with each other and you don't have a way in. You've never had a way in." },
      { name: "Excluded", definition: "The specific pain of being left out — others included, you not, the gap between them and you deliberate or indifferent.", sample: "The plans were made and you weren't in them. Maybe it was an oversight. The feeling it produces doesn't care about maybe." },
      { name: "Isolated", definition: "A practical and emotional aloneness — cut off from connection by circumstance, choice, or the slow drift of disconnection.", sample: "You look at your phone. No messages. You think about calling someone. You can't think of who. You put the phone down." },
      { name: "Forgotten", definition: "The painful sense of not being held in others' minds — of being someone who doesn't get remembered.", sample: "They moved on and you stayed exactly where you were. To them it's the past. To you it's still happening." },
      { name: "Desolate", definition: "A profound, landscape-level emptiness — not just alone but surrounded by absence as far as one can see.", sample: "Everything that used to populate your life feels gone. You move through rooms that feel like they belong to someone else." },
      { name: "Lost", definition: "The disorientation of not knowing where one is — in a relationship, in one's life, in oneself — after something has changed.", sample: "You don't know who you are in this new version of things. The map you were using doesn't work here." },
      { name: "Burdened", definition: "Sadness expressed as weight — carrying responsibility, grief, or the accumulated heaviness of too many hard things.", sample: "You keep taking it on. You don't know how to put it down. The weight is so familiar you've stopped noticing it's there." },
      { name: "Weary", definition: "Sadness and exhaustion combined — the bone-deep tiredness that comes from too much loss, too much effort, too long.", sample: "You're tired in a way that sleep doesn't fix. The weariness is in your soul, not your body. It's been there a long time." },
      { name: "Disheartened", definition: "The sinking feeling when hope gives way to reality — the heart that had lifted, deflating.", sample: "You believed in it. You really did. Now you're looking at how it actually is, and the gap between the two is hard to close." },
      { name: "Gloomy", definition: "A low, dark mood that settles over everything — not acute pain, but a dimming of the light.", sample: "The day has a grey quality. Not because anything happened. Just the way it feels from inside. Dark and flat and without particular hope." },
      { name: "Homesick", definition: "The ache for a place, time, or version of life that no longer exists or cannot be returned to.", sample: "You miss something you can't go back to. The place has changed, or you have. The missing doesn't care." },
      { name: "Aching", definition: "A persistent, physical-feeling emotional pain — not sharp, but constant; not dramatic, but always there.", sample: "It doesn't announce itself. It's just there when you check. A quiet persistent hurt that's been living in your chest for a while." },
      { name: "Heavy-Hearted", definition: "Sadness expressed as physical weight in the chest — the heart that feels literally heavier than usual.", sample: "You put your hand there sometimes, where the feeling lives. Heavy. Not broken. Just heavy. Like it's carrying something." },
      { name: "Blue", definition: "A colloquial, mild sadness — not crisis, but the colour of a day or stretch of days that don't feel good.", sample: "You're not in crisis. You're just not okay. Things feel a little flat. You'll probably be fine. You're just not right now." },
      { name: "Estranged", definition: "The particular sadness of having grown distant from someone or something once close — not dramatic rupture, but slow drift.", sample: "You used to be close. Something happened — or nothing happened — and the distance grew. Now it would take a lot to close it." },
      { name: "Displaced", definition: "Sadness arising from being out of place — geographically, temporally, or socially — without a clear sense of where one belongs.", sample: "You don't quite fit here. You're not sure where you do fit. The not-fitting has a particular quality when it goes on long enough." },
      { name: "Pained", definition: "A direct, unmediated experience of emotional hurt — the clean feeling of something that simply hurts.", sample: "It hurt. Not complicated. Not mixed. Just the plain experience of pain at something that touched somewhere real." },
      { name: "Tearful", definition: "The physical edge of sadness — the feeling that sits just behind the eyes, the tightness in the throat, before or between tears.", sample: "You're not crying. But you're close. The feeling is right there. One thing — the wrong song, the right sentence — and it will tip." },
      { name: "Dejected", definition: "Sadness combined with a loss of spirit — the downcast, low-energy state following rejection or failure.", sample: "You came back with less than you left with. The spirit that went in didn't come out. You sit with what's left of the day." }
    ]
  },
  {
    id: "disgust",
    label: "Disgust",
    valence: "dark",
    hue: "#1e2d1e",
    accent: "#4a6741",
    description: "A rejecting emotion that pushes away what feels contaminating, wrong, or violating to one's values or body.",
    feelings: [
      { name: "Revolted", definition: "An intense, physical-level disgust — the body recoils before the mind catches up.", sample: "Your stomach turns. You pull back physically. Something in you says: no, not this, get away." },
      { name: "Morally Disgusted", definition: "Disgust triggered by witnessing or participating in something that violates one's ethical sense.", sample: "You watch someone be cruel and feel something curdled and dark move through you. You want to be nowhere near it." },
      { name: "Self-Disgusted", definition: "Disgust directed inward — toward one's own actions, body, or impulses.", sample: "You did the thing you swore you wouldn't. The look you give yourself in the mirror is the one you'd give something spoiled." },
      { name: "Repulsed", definition: "A deep, sustained disgust — not a reflex but a settled aversion to something felt as fundamentally wrong.", sample: "Even thinking about it makes you feel unclean. It's not just distaste. The whole thing is wrong at a level you can't fully explain." },
      { name: "Contaminated", definition: "A disgust state in which a person feels that something harmful has gotten inside them and altered them.", sample: "Something happened and you haven't felt clean since. You keep washing your hands. The dirt isn't on the surface." },
      { name: "Sickened", definition: "A physical and moral nausea — the body registering the wrongness of what has been witnessed or experienced.", sample: "It landed in your stomach first. A wave of something. Wrong. This is wrong. Your body knew before your words did." },
      { name: "Nauseated", definition: "The physical face of disgust — the gut response to something deeply unacceptable.", sample: "You heard what happened and felt it physically. A turning in your stomach that isn't about food." },
      { name: "Appalled", definition: "Disgust and shock combined — the stunned reaction to something that shouldn't be possible.", sample: "You couldn't believe it was happening. You still can't quite. The wrongness of it is so complete it left you without words." },
      { name: "Offended", definition: "A milder disgust at something that violates one's sense of decency, respect, or appropriateness.", sample: "That shouldn't have been said. That shouldn't have been done. You're not enraged — but you're not okay with it either." },
      { name: "Averse", definition: "A quieter disgust — a strong preference away from something that feels wrong or unsafe.", sample: "You don't want to be near it. You don't want to engage with it. The pull away from it is stronger than logic." },
      { name: "Disturbed", definition: "Disgust mixed with unease — something seen or heard that won't settle, that keeps surfacing.", sample: "You've been thinking about it since it happened. It got into you somehow. It sits wrong and won't resolve." },
      { name: "Horrified", definition: "Disgust at high intensity — the confrontation with something monstrous or deeply violating.", sample: "There are things you can't unsee. Things that changed something. The horror isn't in the past tense. It's still landing." },
      { name: "Disdainful", definition: "A cool, contemptuous disgust — the sense that something is beneath one's standards or beneath serious consideration.", sample: "You look at it and feel nothing but a quiet, settled rejection. Not worth anger. Not worth engagement. Just: no." },
      { name: "Repugnant Feeling", definition: "The experience of something inside oneself feeling deeply wrong — one's own impulses or reactions triggering disgust.", sample: "You had the thought. And then the thought about the thought. You don't want to be someone who thinks that. But you did." },
      { name: "Loathsome Feeling", definition: "Revulsion directed at something or someone with a particular intensity — a visceral, full-body rejection.", sample: "Everything about it is wrong. The sight, the thought, the memory. Your whole system pushes away from it." },
      { name: "Repelled", definition: "Being driven away from something by disgust — unable to remain near or engaged with what produces the feeling.", sample: "You couldn't stay in the room. You couldn't keep reading. Something in you simply refused continued contact." },
      { name: "Turned Off", definition: "A milder disgust, particularly in social or relational contexts — the fading of positive feeling in the face of something off-putting.", sample: "Something they said or did changed the atmosphere. The warmth pulled back. You couldn't quite get it back after that." }
    ]
  },
  {
    id: "guilt",
    label: "Guilt",
    valence: "transitional",
    hue: "#2e2418",
    accent: "#8a6d2f",
    description: "An emotion signalling that one's actions have violated one's own values — distinct from shame, which attacks the self; guilt addresses the behaviour.",
    feelings: [
      { name: "Remorseful", definition: "Deep guilt accompanied by genuine regret — a wish to undo harm caused.", sample: "You see the hurt on their face and feel it land in you. You'd take it back if you could. You replay it looking for another way." },
      { name: "Regretful", definition: "Guilt or sadness about a past choice — the road not taken, the words not said, the action not corrected in time.", sample: "Years later it still surfaces. If only. You carry it quietly, the way you carry things you can't put down." },
      { name: "Responsible", definition: "The more functional face of guilt — acknowledging one's role in harm without collapsing into self-punishment.", sample: "You caused this. You name that plainly. Now you look at what can be repaired." },
      { name: "Culpable", definition: "A clear-eyed recognition of one's contribution to a harmful outcome — without inflation or deflection.", sample: "You don't minimise it. You don't catastrophise it. You played a role. You hold that fact steadily and decide what comes next." },
      { name: "At Fault", definition: "A guilt state where one assigns responsibility to oneself, sometimes accurately, sometimes beyond what is warranted.", sample: "Somehow it always comes back to you. You run through it again. Could you have done something different? You probably could have." },
      { name: "Contrite", definition: "Guilt expressed as genuine sorrow and a sincere desire to make amends — the full, open acknowledgment of wrong done.", sample: "You're not defending any of it. You're not explaining. You did harm. You know it. You want to make it right." },
      { name: "Accountable", definition: "The felt sense of owning one's impact — not just intellectually, but in a way that motivates repair.", sample: "This is yours to own. You're not running from it. You're looking at it directly and deciding what you're going to do." },
      { name: "Troubled", definition: "A milder guilt — the discomfort of having done something slightly wrong or of holding a secret that weighs.", sample: "It's been sitting with you since it happened. Not crisis. Just an ongoing low-level sense that something needs addressing." },
      { name: "Conflicted", definition: "The guilt of competing loyalties — having done right by one value at the cost of another.", sample: "You made the choice you had to make. It was the right call. You still feel bad about what it cost someone else." },
      { name: "Obligated", definition: "Guilt that has been internalised as ongoing duty — the sense of owing something that can never quite be repaid.", sample: "You can't say no. There's always a reason you should say yes. The debt is never settled." },
      { name: "Self-Blaming", definition: "Guilt that has become a habitual internal posture — turning toward oneself as the cause whenever something goes wrong.", sample: "Before anyone says anything you've already decided it's your fault. You got there first. You always do." },
      { name: "Rueful", definition: "A gentle, wistful guilt — less about active harm than about missed chances or choices one wishes had gone differently.", sample: "You didn't do anything terrible. You just didn't do the thing you should have. And you've been noticing that absence ever since." },
      { name: "Unforgiving of Self", definition: "The refusal to extend oneself the repair that guilt calls for — punishment maintained beyond the point of usefulness.", sample: "You've apologised. They've forgiven you. You haven't forgiven you. You're not sure you're allowed to." },
      { name: "Complicit", definition: "Guilt from participation in something wrong — not the one who acted, but the one who stood by, enabled, or stayed silent.", sample: "You didn't stop it. You could have said something. You didn't. That's its own kind of doing." },
      { name: "Deceitful Feeling", definition: "Guilt arising from having been dishonest — the weight of carrying something untrue with another person.", sample: "They think they know what happened. They don't. You let the wrong version stand. That sits in you every time you're with them." },
      { name: "Disloyal Feeling", definition: "Guilt arising from having betrayed a trust, a bond, or a commitment — the sense of having failed someone who counted on you.", sample: "They would be hurt if they knew. They trusted you and you didn't hold that the way you should have." },
      { name: "Negligent Feeling", definition: "Guilt about what one failed to do — not an act of harm but an absence of action that caused harm.", sample: "You should have checked. You should have asked. The thing happened and you weren't paying the attention that would have made a difference." }
    ]
  },
  {
    id: "surprise",
    label: "Surprise",
    valence: "neutral",
    hue: "#1e2e3e",
    accent: "#4a7fa8",
    description: "A brief orienting emotion — the mind and body pausing to register something unexpected before assigning it positive or negative meaning.",
    feelings: [
      { name: "Shocked", definition: "Surprise so sudden or significant that it temporarily suspends normal processing.", sample: "You hear the news and for a moment there is nothing — no reaction, no words. The information is there but hasn't landed yet." },
      { name: "Startled", definition: "A reflexive physical response to an abrupt, unexpected stimulus.", sample: "The door slams. You jump. Your heart spikes. A second later you recognize it as harmless and exhale." },
      { name: "Disoriented", definition: "A sustained confusion following an unexpected event — the mental map no longer matches the territory.", sample: "You keep trying to make sense of it. You thought you knew how this worked. You don't know what you're looking at anymore." },
      { name: "Astonished", definition: "Surprise at high intensity — what happened was so outside expectation that comprehension takes a moment to catch up.", sample: "You just stand there. You weren't prepared for this. You're not sure anyone could have been." },
      { name: "Bewildered", definition: "Surprise mixed with confusion — the event has happened and you still can't find a frame that fits it.", sample: "You keep turning it over. None of the angles make sense. What just happened. Why did that just happen." },
      { name: "Dumbfounded", definition: "Surprise so complete it temporarily removes language — standing speechless before something incomprehensible.", sample: "They asked if you had anything to say. You didn't. You still don't. The words are somewhere else entirely." },
      { name: "Awestruck", definition: "Surprise blended with reverence — confronting something so large, beautiful, or powerful that ordinary response fails.", sample: "You stopped moving. Stopped thinking. The only thing available was the experience of it — vast, and you, small inside it." },
      { name: "Caught Off-Guard", definition: "Surprise that reveals one was unprepared — the gap between one's defences and reality made suddenly visible.", sample: "You didn't see it coming. Your usual composure, your usual read of things — none of it helped. You were just there, unprepared." },
      { name: "Jarred", definition: "The unsettling sensation of an unexpected impact — something hit without warning and the system is still absorbing it.", sample: "It wasn't catastrophic. It was just sudden. The jarring is in the suddenness. You'll get your footing back. Not yet." },
      { name: "Curious", definition: "Surprise oriented positively — an unexpected thing has appeared and you want to move toward it, understand it.", sample: "That wasn't what you expected. It's interesting. You find yourself leaning toward it rather than back from it." },
      { name: "Unsettled", definition: "Surprise that has left a residue — the event is over but something in it disturbed an assumption you didn't know you had.", sample: "You keep coming back to it. Something about it doesn't sit right. An assumption was violated. You're still figuring out which one." },
      { name: "Jolted", definition: "A sudden, physical-feeling surprise — as if something administered a brief, sharp shock to the system.", sample: "Something happened and you felt it like a physical thing. A snap of reality. Real and fast and briefly total." },
      { name: "Perplexed", definition: "A mild, sustained surprise about something confusing — not distressing, but unresolved.", sample: "You're not upset. You're just not sure what's going on. The situation doesn't add up and you keep trying to make it." },
      { name: "Amazed", definition: "Positive surprise at something that exceeds ordinary expectation — the world has delivered something beyond the standard frame.", sample: "You didn't know things could be like this. You've revised upward. Something is possible that you didn't put in the category of possible." },
      { name: "Flabbergasted", definition: "An informal, intensified form of shock — the state of being so surprised that ordinary composure temporarily leaves.", sample: "You couldn't even get words out. Your expression said it all. You've since recovered but the surprise is still fresh." },
      { name: "Taken Aback", definition: "Mild surprise combined with a momentary step back — the pause before regrouping after an unexpected moment.", sample: "That wasn't what you expected. You need a second. You're recalibrating. You'll have a response in a moment." }
    ]
  },
  {
    id: "contentment",
    label: "Contentment",
    valence: "light",
    hue: "#1a2e1a",
    accent: "#2d7d5f",
    description: "A quiet, steady positive state — not excitement, but a settled sense that things are enough, that one is enough.",
    feelings: [
      { name: "Calm", definition: "The absence of agitation — a state of inner stillness that doesn't require anything to be different.", sample: "Your shoulders drop. Your breath slows. Nothing is wrong. You don't need to be anywhere else." },
      { name: "Satisfied", definition: "The feeling that follows completing something meaningful — effort met with result.", sample: "You look at what you built, made, or finished. There's a quiet rightness to it. Enough." },
      { name: "Peaceful", definition: "Contentment at depth — a lack of internal conflict, a feeling of being reconciled with oneself and one's circumstances.", sample: "The noise in your head has gone quiet. You're not bracing for anything. There is just this." },
      { name: "Relieved", definition: "The release of fear or tension once a threat has passed — contentment emerging from the other side of stress.", sample: "It's over. You exhale fully for the first time in days. Your body unclenches. You'd forgotten what this felt like." },
      { name: "At Ease", definition: "A comfortable, unguarded state — no performance required, no threat detected, nothing to manage.", sample: "You're just here. Not scanning for danger, not preparing a response. You're in it without effort." },
      { name: "Okay", definition: "The underrated state of functional sufficiency — not transcendent, not broken. Simply adequate and stable.", sample: "You check in with yourself. Nothing is wrong. You don't need it to be anything more than this right now." },
      { name: "Deserving", definition: "A quiet belief that good things — rest, care, joy — are legitimately one's own to have. A recovery milestone in CEN work.", sample: "You let yourself have it without immediately undercutting it. You don't talk yourself out of the good thing. You just receive it." },
      { name: "Settled", definition: "An inner stability — things are in their place, internally and externally; no unsettled business demanding attention.", sample: "You sit down and there's nothing pulling you somewhere else. Nothing unresolved demanding your attention. Just here." },
      { name: "Secure", definition: "A felt sense of safety — that the ground will hold, that one's place is not in danger, that one is not about to be lost.", sample: "You don't need to monitor anything right now. It's safe. You can let down the vigilance you usually carry." },
      { name: "Grounded", definition: "A connection to oneself and the present moment — solid, present, not swept away by internal weather.", sample: "You feel your feet. You feel where you are. The noise is there but you're not inside it. You're here." },
      { name: "Comfortable", definition: "A mild positive ease — physical and emotional comfort aligned, nothing demanding, nothing wrong.", sample: "The chair is right. The temperature is right. You're not performing. This will do. This is actually good." },
      { name: "Reassured", definition: "Contentment following a period of uncertainty — the relief of confirmation that things are okay.", sample: "They said the thing you needed to hear. Not because you pushed for it — because it was true. You feel it settle." },
      { name: "Stable", definition: "The positive experience of consistency — not exciting, but deeply valuable; the ground that doesn't shift.", sample: "Things are the same today as they were yesterday in all the important ways. You didn't realise how much you needed that until it arrived." },
      { name: "Centred", definition: "A state of alignment between one's inner experience and outer behaviour — integrated, not performing.", sample: "You said what you meant. You meant what you said. Nothing was managed or performed. You were just yourself." },
      { name: "Accepted", definition: "The experience of being received as one is — without condition, correction, or requirement to be different.", sample: "They know the real version. The unpolished one. And they're still here. Something in you relaxes at a very deep level." },
      { name: "Enough", definition: "The felt sense that one is sufficient — not exceptional, but genuinely adequate. A profound arrival point in CEN recovery.", sample: "You didn't do everything perfectly. You didn't need to. What you are and what you did — it was enough. You let yourself believe that." },
      { name: "Rested", definition: "The positive state of having recovered — from effort, from stress, from the expenditure of being in the world.", sample: "You woke up and the tiredness wasn't there. Fully slept. Fully here. The day has a quality it doesn't always have." },
      { name: "Unburdened", definition: "The lightness that follows the setting down of a weight — relief from responsibility, obligation, or grief that had been carried.", sample: "You put it down. Whatever it was, you're not carrying it right now. The absence of the weight is its own kind of feeling." },
      { name: "Present", definition: "The quality of being fully in one's current experience — not ahead, not behind, not elsewhere. Rare and valuable.", sample: "You're not thinking about later. You're not thinking about before. You're in this exact moment and it has your full attention." },
      { name: "Resolved", definition: "Contentment following the closure of something unfinished — a conflict addressed, a decision made, an old weight named and set down.", sample: "You said the thing you'd been holding. Or made the call you'd been avoiding. The unfinished business is finished. You feel lighter." },
      { name: "Whole", definition: "A rare, deep contentment — the sense of being integrated, of one's parts cohering rather than competing.", sample: "Nothing is fighting anything else right now. You're not split. The version of you that's here is actually all of you." },
      { name: "Untroubled", definition: "The absence of the usual worry or preoccupation — a clear, light internal state without the usual static.", sample: "You notice the quiet. No loop playing. No problem running in the background. Just the moment, uncluttered." },
      { name: "Balanced", definition: "A sense of proportion and equilibrium — not pulled too far in any direction, able to respond without being overwhelmed.", sample: "Things are in proportion today. What's important feels important, what's minor feels minor. That's not always true. Today it is." },
      { name: "Dignified", definition: "A quiet positive self-regard — a sense of carrying oneself with worth and integrity, regardless of external circumstances.", sample: "You walked out of that with your head up. Not proud, not defensive. Just intact. That's something." },
      { name: "Clear", definition: "Mental and emotional clarity — knowing what one thinks, feels, and wants without the usual fog.", sample: "You can see it today. What matters, what doesn't. What you want, what you're willing to do. The path is just visible." }
    ]
  },
  {
    id: "joy",
    label: "Joy",
    valence: "light",
    hue: "#1e2a10",
    accent: "#7a8a1a",
    description: "An expansive positive emotion — a sense of aliveness, goodness, and fullness. Can be quiet or exuberant.",
    feelings: [
      { name: "Happy", definition: "A general positive emotional state — things feel good, life feels workable or better than workable.", sample: "You catch yourself smiling at nothing in particular. The day has a warmth to it. You feel basically okay with being alive." },
      { name: "Delighted", definition: "Happiness with sparkle — a burst of pleasure at something unexpected or charming.", sample: "The dog does the ridiculous thing. The line in the book is perfect. Something small turns into a gift." },
      { name: "Elated", definition: "Joy at high intensity — a feeling of lift and expansion, often following a significant positive event.", sample: "Your chest feels huge. You want to call everyone. The world is bright and you're moving through it faster than usual." },
      { name: "Enthusiastic", definition: "Joy channelled into energy and forward motion — the feeling that you want to do the thing, now.", sample: "You sit down and work without noticing the time. You're not forcing anything. The momentum is already there." },
      { name: "Excited", definition: "Joy with anticipation — the energised feeling of something good approaching or beginning.", sample: "You can't stop thinking about it. You're already half there in your head. The waiting is almost as good as the thing itself." },
      { name: "Optimistic", definition: "Joy oriented toward the future — a genuine sense that things can go well, that good outcomes are possible.", sample: "You make the plan and actually believe it. Not naively — you've seen hard things. But right now, forward feels possible." },
      { name: "Alive", definition: "A full-body sense of vitality and presence — the opposite of numbness, the signal that one is genuinely inhabiting one's life.", sample: "Everything is sharper. You notice things. Your body is in it. You feel the difference between existing and actually being here." },
      { name: "Playful", definition: "Joy expressed as lightness, creativity, and willingness to be foolish without shame.", sample: "You're not managing anything. You're just in it — the game, the joke, the moment. Nothing is at stake and that's exactly right." },
      { name: "Joyful", definition: "Pure, expansive positive feeling — a fullness that doesn't need explanation or defence.", sample: "It's there. Big and clean. You didn't do anything to earn it. It just arrived. You let it." },
      { name: "Exuberant", definition: "Joy that overflows — buoyant, loud, spilling out in all directions.", sample: "You can't sit still with it. It wants to go somewhere. You find yourself laughing at nothing, moving faster, more." },
      { name: "Gleeful", definition: "A bright, childlike joy — the particular pleasure of something funny or absurd or unexpectedly wonderful.", sample: "It was such a small thing. But you laughed. Actually laughed. The kind that surprises you." },
      { name: "Jubilant", definition: "Joy attached to a triumph or significant achievement — celebratory, earned, expansive.", sample: "You did it. After everything. You stood there and it was done and you felt it fully — the whole weight of what that meant." },
      { name: "Blissful", definition: "Joy at its most saturated — a state of complete positive immersion with no intrusion of worry or lack.", sample: "For a while, there was only this. Nothing was wrong. Nothing was missing. The fullness was total." },
      { name: "Radiant", definition: "Joy expressed outward — the sense of positive energy moving through and beyond the self.", sample: "People commented on it. You didn't know it was showing. But it was — the good thing was all the way through you." },
      { name: "Inspired", definition: "Joy mixed with creative energy — the ignition of wanting to make, do, or become something.", sample: "Something opened. Ideas are coming fast. You want to write it down, start it, be in it. The feeling is generative." },
      { name: "Proud", definition: "Joy in one's own achievement or in someone one loves — the felt recognition of something good that was earned.", sample: "You look at what you did. What they did. You hold it for a moment without deflecting. This is good. I did this." },
      { name: "Triumphant", definition: "Joy following overcoming — the particular satisfaction of having gotten through the hard thing and come out the other side.", sample: "You made it. Not easily. Not without cost. But you made it. The feeling of that is different from any other kind of good." },
      { name: "Buoyant", definition: "Joy expressed as lightness — the sense of being lifted, of the usual heaviness being absent.", sample: "You're lighter today. Not because anything changed. The weight just isn't as present. You move through the day with an ease you don't always have." },
      { name: "Energised", definition: "Joy with a physical component — the body responding to good feeling with readiness and capacity.", sample: "You have energy you didn't expect. The day that seemed long is going fast. Your body is on your side today." },
      { name: "Liberated", definition: "Joy following the removal of constraint — the exhilaration of being free from something that had been limiting.", sample: "Something lifted. A rule you'd been following, a fear you'd been managed by. Without it you feel the space. It's enormous." },
      { name: "Amused", definition: "A light, pleasant joy at something funny or incongruous — the mild version of laughter.", sample: "The thing was funny. Quietly, internally funny. You smiled to yourself. The world landed a small gift." },
      { name: "Hopeful", definition: "Joy aimed at a possible future — the tentative, precious sense that something good might actually happen.", sample: "You let yourself want it. You haven't done that in a while. The wanting feels risky. It also feels like something." },
      { name: "Renewed", definition: "Joy following restoration — the sense of having come back to something essential after a period of depletion or loss.", sample: "You feel like yourself again. More yourself than you have in a while. Something returned that you'd stopped expecting." },
      { name: "Spirited", definition: "Joy expressed as liveliness — energy, engagement, and a sense of forward momentum through the day.", sample: "You showed up today. Fully. You were in it — the conversation, the work, the moment. That's not always true. Today it was." },
      { name: "Carefree", definition: "Joy in the absence of the usual concerns — a temporary freedom from worry that allows genuine lightness.", sample: "For once you're not tracking anything. Not managing anything. The day is just the day. That's a gift." },
      { name: "Giddy", definition: "A light-headed, bubbly joy — the feeling that produces spontaneous smiling or laughter without great cause.", sample: "Something is making you laugh and you can't quite explain why. The feeling is light and spinning and good." },
      { name: "Merry", definition: "A warm, sociable joy — the good feeling that comes from pleasant company, celebration, and shared ease.", sample: "The room was right. The people were right. There was noise and warmth and laughter and you were part of it." },
      { name: "Thrilled", definition: "Joy mixed with excitement at a significant positive surprise or event — the feeling of something wonderful happening right now.", sample: "This is really happening. The good thing you hoped for is actually occurring. You feel it in your chest and your hands." },
      { name: "Grateful", definition: "Joy expressed as appreciation — the felt recognition of what one has received, from others or from life itself.", sample: "You think about what you have and feel the weight of it differently than usual — as gift, not given. That's not nothing." },
      { name: "Serene", definition: "A high, still joy — peace and positive feeling combined in a state that requires nothing and lacks nothing.", sample: "Everything is as it should be. Nothing is pressed. The good is present without any effort. You're just in it." }
    ]
  },
  {
    id: "love",
    label: "Love",
    valence: "light",
    hue: "#2e1a2a",
    accent: "#c0185e",
    description: "A connecting emotion — a felt sense of care, attachment, and value for another person (or oneself). The goal-state of Jonice Webb's CEN recovery work.",
    feelings: [
      { name: "Affectionate", definition: "A warm, gentle fondness for another — not overwhelming, just a steady positive pull toward them.", sample: "You watch them do something ordinary and feel a quiet warmth. You're glad they exist." },
      { name: "Compassionate", definition: "Love extended toward suffering — a desire to reduce another's pain, without losing oneself in it.", sample: "You see their struggle and something in you leans toward them. You want to help — not fix, just be there." },
      { name: "Self-Compassionate", definition: "Compassion directed inward — treating oneself with the same gentleness one would offer a friend in pain. A core recovery skill in CEN work.", sample: "You made a mistake. Instead of attacking yourself, you pause. You were doing your best with what you had. That counts." },
      { name: "Tender", definition: "Love expressed as a gentle, protective care — particularly toward vulnerability.", sample: "They show you something soft and real. You handle it carefully. You don't want to break it." },
      { name: "Grateful", definition: "Love expressed as acknowledgment — a felt recognition of what one has received, from others or from life.", sample: "You think of them and feel the weight of how much they matter. You don't say it enough. You feel it now." },
      { name: "Connected", definition: "The felt experience of love in action — the sense of being known, seen, and met by another person.", sample: "They got it. Exactly. You didn't have to explain or defend. You were just understood. Something in you relaxes all the way down." },
      { name: "Warm", definition: "Love expressed as a physical and emotional glow — a felt sense of positive regard that radiates outward.", sample: "You think of them and something soft moves through your chest. Not dramatic. Just warm. Like sitting near a fire." },
      { name: "Loyal", definition: "Love expressed as steadfast commitment — the choice to stay, keep faith, and show up over time.", sample: "Things got hard. You stayed. Not out of obligation — out of genuine care that held even when it wasn't easy." },
      { name: "Cared For", definition: "The receiving end of love — the experience of being held, considered, and valued by another. Can be unfamiliar and uncomfortable for those with CEN histories.", sample: "They did the thing without being asked. They remembered. For a moment you let it land instead of deflecting it. It feels strange and good." },
      { name: "Appreciated", definition: "The recognition that one's presence, effort, or being has been seen and valued by someone else.", sample: "They said it and meant it. You felt the difference. Not flattery — actual acknowledgment. You mattered to this person in this moment." },
      { name: "Cherished", definition: "The experience of being held as precious by another — not just liked, not just loved, but valued beyond ordinary measure.", sample: "The way they looked at you. The way they spoke about you to others. Something in you that is rarely reached was reached." },
      { name: "Seen", definition: "The experience of being genuinely perceived — one's real self witnessed, not one's performed self. A profound need and a profound gift.", sample: "You didn't have to explain it. They already knew. The relief of being known without having to construct the explanation." },
      { name: "Known", definition: "A deeper version of being seen — the experience of being understood over time, in depth, in one's complexity.", sample: "They know your history. They know your patterns. They're still here. That means something different than ordinary company." },
      { name: "Trusted", definition: "The experience of being the recipient of someone's confidence — chosen as safe, reliable, and worthy of real things.", sample: "They told you the thing they don't tell people. You felt the weight of that. The honour of being let in." },
      { name: "Belonging", definition: "The felt experience of being a legitimate member — of a group, a relationship, a place — where one's presence is genuinely wanted.", sample: "You walked in and you were expected. Your presence was the right thing. You fit here. Not performed fit — actual fit." },
      { name: "Held", definition: "An experience of emotional containment — the sense that someone is present with you in a way that makes the hard thing bearable.", sample: "You didn't have to carry it alone. They were there. Not fixing anything. Just there. That was enough. More than enough." },
      { name: "Adored", definition: "The experience of being the object of someone's deep delight — loved with warmth and enthusiasm.", sample: "The way they talk about you. The way their face changes when you walk in. You are, to this person, a genuinely wonderful thing." },
      { name: "Safe with Someone", definition: "The relational experience of fear being absent — this person will not harm, judge, or abandon. A fundamental human need.", sample: "You can say the real thing here. You don't have to manage your words. You don't have to brace for the response. This is safe." },
      { name: "Devoted", definition: "Love expressed as dedicated, sustained commitment — care that has made itself a priority over time.", sample: "You'd do it again. All of it. Not because it was easy but because they are worth the continued choosing." },
      { name: "Empathetic", definition: "Love expressed as felt understanding — entering another's experience fully enough to know it from the inside.", sample: "You felt it with them. Not for them, not about them — with them. That difference matters and they could tell." },
      { name: "Nurturing", definition: "Love expressed as active, attentive care — attending to another's needs and growth as a meaningful act.", sample: "You thought about what they needed. You provided it. Not because it was required. Because you genuinely wanted them to flourish." },
      { name: "Bonded", definition: "A deep, durable sense of attachment — the relationship has a history, a substance, a permanence that ordinary connection doesn't.", sample: "You've been through things together. That changes what you are to each other. The bond has weight. It has history. It holds." },
      { name: "Generous", definition: "Love expressed as giving — of time, attention, resources, or care — without keeping score.", sample: "You gave it without needing anything back. That's different from obligation. You wanted to. It felt like the right expenditure." },
      { name: "Moved", definition: "The experience of being emotionally affected by love — touched at a depth that registers as physical, as something that shifts inside.", sample: "It landed in you somewhere deep. You didn't see it coming. You found yourself with something in your throat and your eyes." },
      { name: "Open-Hearted", definition: "A state of receptivity to love — the heart's defences lowered, available to both give and receive without armour.", sample: "Something happened and you let it matter. You didn't protect yourself from it. You let it in. That takes something." },
      { name: "Longing to Connect", definition: "The ache of wanting love and connection that is not yet present — the desire for closeness not yet fulfilled.", sample: "You watch the way they are together and feel it — a wanting. Not jealousy. Just the wish to have what that looks like." },
      { name: "Protective", definition: "Love expressed as the impulse to shield — to keep someone safe from harm because they matter.", sample: "Something in you straightened when the threat appeared. Not aggression — care. You will not let this reach them." },
      { name: "Attached", definition: "The felt bond of dependency and care — the deep positive orientation toward specific people that makes their wellbeing matter.", sample: "Something happened to them and you felt it. Not because you were supposed to. Because they are yours in some fundamental way." },
      { name: "Interested in Others", definition: "Love expressed as genuine curiosity — wanting to know another person, not for utility but for the pleasure of knowing them.", sample: "You asked and you actually wanted to know the answer. Not as social protocol. Because they're interesting to you." },
      { name: "Forgiving", definition: "Love expressed as the release of held grievance — choosing the relationship over the record of its failures.", sample: "You could keep holding it. You've decided not to. Not because it didn't matter. Because they matter more than it does." }
    ]
  }
];


export default function EmotionExplorer() {
  const [selected, setSelected] = useState(null);
  const [activeFeelingId, setActiveFeelingId] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const selectedEmotion = emotionData.find(e => e.id === selected);
  const totalFeelings = emotionData.reduce((sum, e) => sum + e.feelings.length, 0);

  useEffect(() => {
    if (!search.trim()) { setSearchResults([]); return; }
    const q = search.toLowerCase();
    const results = [];
    emotionData.forEach(e => {
      e.feelings.forEach(f => {
        if (f.name.toLowerCase().includes(q) || f.definition.toLowerCase().includes(q) || f.sample.toLowerCase().includes(q)) {
          results.push({ emotion: e, feeling: f });
        }
      });
    });
    setSearchResults(results);
  }, [search]);

  useEffect(() => { setActiveFeelingId(null); }, [selected]);

  const valenceLabel = v => ({ dark: "Difficult", transitional: "Complex", neutral: "Neutral", light: "Positive" })[v] || "";

  const visibleEmotions = search.trim()
    ? emotionData.filter(e => e.label.toLowerCase().includes(search.toLowerCase()) || e.feelings.some(f => f.name.toLowerCase().includes(search.toLowerCase()) || f.definition.toLowerCase().includes(search.toLowerCase())))
    : emotionData;

  // Shared card styles
  const cardBase = (accent, isOpen) => ({
    background: isOpen ? "#ffffff" : "#fafafa",
    border: `1px solid ${isOpen ? accent + "66" : "#e8e8e8"}`,
    borderLeft: `3px solid ${isOpen ? accent : "#ddd"}`,
    borderRadius: 6,
    overflow: "hidden",
    transition: "all 0.15s ease",
    boxShadow: isOpen ? "0 2px 8px rgba(0,0,0,0.06)" : "none"
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f4f2ee", color: "#2a2a2a", fontFamily: "'Georgia', 'Times New Roman', serif", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid #e0ddd8", padding: "2.5rem 2rem 2rem", maxWidth: 1120, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <div style={{ fontSize: "0.68rem", letterSpacing: "0.32em", color: "#555", textTransform: "uppercase", marginBottom: "0.6rem", fontFamily: "system-ui, sans-serif" }}>
          Getting in Touch with Your Own Feelings
        </div>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 400, margin: 0, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#1a1a1a" }}>
          Emotion Explorer
        </h1>
        <p style={{ marginTop: "0.85rem", color: "#777", fontSize: "0.92rem", fontStyle: "italic", maxWidth: 520, lineHeight: 1.65, margin: "0.85rem 0 0" }}>
          Emotions are broad signal states. Feelings are their specific textures.
          Understanding both is how you begin to know yourself.
        </p>
        <div style={{ marginTop: "0.4rem", fontSize: "0.72rem", color: "#666", fontFamily: "system-ui, sans-serif" }}>
          {emotionData.length} emotions · {totalFeelings} feelings
        </div>
        <div style={{ marginTop: "1.2rem", position: "relative", maxWidth: 420 }}>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search any feeling by name or description…"
            style={{ width: "100%", background: "#f8f7f5", border: "1px solid #ddd", borderRadius: 6, padding: "0.6rem 2.2rem 0.6rem 1rem", color: "#2a2a2a", fontSize: "0.88rem", fontFamily: "system-ui, sans-serif", outline: "none", boxSizing: "border-box", transition: "border-color 0.15s" }}
            onFocus={e => e.target.style.borderColor = "#aaa"}
            onBlur={e => e.target.style.borderColor = "#ddd"}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "1.1rem", lineHeight: 1, padding: 0 }}>×</button>
          )}
        </div>
        {search && <div style={{ marginTop: "0.35rem", fontSize: "0.75rem", color: "#666", fontFamily: "system-ui, sans-serif" }}>{searchResults.length} result{searchResults.length !== 1 ? "s" : ""}</div>}
      </header>

      <div style={{ display: "flex", flex: 1, maxWidth: 1120, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>

        {/* Sidebar nav */}
        <nav style={{ width: 190, flexShrink: 0, background: "#ffffff", borderRight: "1px solid #e0ddd8", padding: "1.5rem 0", overflowY: "auto" }}>
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.28em", color: "#666", textTransform: "uppercase", padding: "0 1.2rem", marginBottom: "0.6rem", fontFamily: "system-ui, sans-serif" }}>
            Difficult → Positive
          </div>
          {visibleEmotions.map(e => (
            <button key={e.id}
              onClick={() => { setSelected(selected === e.id ? null : e.id); setSearch(""); }}
              style={{
                display: "block", width: "100%", textAlign: "left",
                background: selected === e.id ? `${e.accent}0d` : "transparent",
                border: "none",
                borderLeft: selected === e.id ? `3px solid ${e.accent}` : "3px solid transparent",
                padding: "0.6rem 1.2rem",
                color: selected === e.id ? e.accent : "#555",
                fontSize: "0.9rem", fontFamily: "inherit", cursor: "pointer",
                transition: "all 0.15s ease",
                fontWeight: selected === e.id ? 600 : 400
              }}
              onMouseEnter={ev => { if (selected !== e.id) { ev.currentTarget.style.background = "#f5f3f0"; ev.currentTarget.style.color = "#222"; }}}
              onMouseLeave={ev => { if (selected !== e.id) { ev.currentTarget.style.background = "transparent"; ev.currentTarget.style.color = "#555"; }}}>
              <span>{e.label}</span>
              <span style={{ display: "block", fontSize: "0.6rem", color: "#888", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.08rem", fontFamily: "system-ui, sans-serif" }}>
                {e.feelings.length} feelings
              </span>
            </button>
          ))}
        </nav>

        {/* Main panel */}
        <main style={{ flex: 1, padding: "2rem 2.5rem", overflowY: "auto", background: "#f4f2ee" }}>

          {search && searchResults.length > 0 ? (
            <div>
              <div style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#666", marginBottom: "1.2rem", fontFamily: "system-ui, sans-serif" }}>
                Results for "{search}"
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {searchResults.map((r, i) => (
                  <div key={i} style={{ background: "#fff", border: `1px solid #eee`, borderLeft: `3px solid ${r.emotion.accent}`, borderRadius: 6, padding: "1rem 1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: r.emotion.accent, marginBottom: "0.3rem", fontFamily: "system-ui, sans-serif" }}>{r.emotion.label}</div>
                    <div style={{ fontSize: "0.95rem", color: "#1a1a1a", marginBottom: "0.5rem", fontWeight: 500 }}>{r.feeling.name}</div>
                    <div style={{ fontSize: "0.83rem", color: "#666", lineHeight: 1.65, marginBottom: "0.6rem" }}>{r.feeling.definition}</div>
                    <div style={{ fontSize: "0.83rem", color: "#555", fontStyle: "italic", lineHeight: 1.72, borderLeft: `2px solid ${r.emotion.accent}44`, paddingLeft: "0.75rem" }}>{r.feeling.sample}</div>
                  </div>
                ))}
              </div>
            </div>

          ) : search && searchResults.length === 0 ? (
            <div style={{ color: "#666", fontStyle: "italic", paddingTop: "2rem", fontFamily: "system-ui, sans-serif", fontSize: "0.9rem" }}>No feelings matched "{search}".</div>

          ) : !selected ? (
            <div style={{ paddingTop: "5rem", textAlign: "center" }}>
              <div style={{ color: "#888", fontSize: "2rem", marginBottom: "1rem" }}>◈</div>
              <div style={{ color: "#666", fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.6 }}>Select an emotion from the left<br />to explore its feelings.</div>
            </div>

          ) : selectedEmotion && (
            <div>
              {/* Emotion header */}
              <div style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid #e5e2de" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.9rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
                  <h2 style={{ fontSize: "2.1rem", fontWeight: 400, margin: 0, color: selectedEmotion.accent, letterSpacing: "-0.01em" }}>
                    {selectedEmotion.label}
                  </h2>
                  <span style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#666", paddingTop: "0.4rem", fontFamily: "system-ui, sans-serif" }}>
                    {valenceLabel(selectedEmotion.valence)} Emotion
                  </span>
                </div>
                <p style={{ margin: 0, color: "#666", fontSize: "0.92rem", lineHeight: 1.68, maxWidth: 580, fontStyle: "italic" }}>
                  {selectedEmotion.description}
                </p>
                <div style={{ marginTop: "0.6rem", fontSize: "0.72rem", color: "#666", fontFamily: "system-ui, sans-serif" }}>
                  {selectedEmotion.feelings.length} specific feelings
                </div>
              </div>

              {/* Feelings list */}
              <div>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "#666", marginBottom: "0.85rem", fontFamily: "system-ui, sans-serif" }}>
                  Feelings within this emotion
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {selectedEmotion.feelings.map((f, i) => {
                    const fid = `${selected}-${i}`;
                    const isOpen = activeFeelingId === fid;
                    return (
                      <div key={fid} style={cardBase(selectedEmotion.accent, isOpen)}>
                        <button onClick={() => setActiveFeelingId(isOpen ? null : fid)}
                          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "transparent", border: "none", padding: "0.75rem 1.2rem", textAlign: "left", cursor: "pointer", fontFamily: "inherit", fontSize: "0.9rem", color: isOpen ? selectedEmotion.accent : "#333", transition: "color 0.15s ease" }}>
                          <span style={{ fontWeight: isOpen ? 600 : 400 }}>{f.name}</span>
                          <span style={{ fontSize: "0.7rem", color: "#888", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s ease", display: "inline-block", marginLeft: "0.5rem" }}>▾</span>
                        </button>
                        {isOpen && (
                          <div style={{ padding: "0 1.2rem 1.1rem" }}>
                            <div style={{ fontSize: "0.83rem", color: "#666", lineHeight: 1.7, marginBottom: "0.85rem", paddingBottom: "0.7rem", borderBottom: "1px solid #f0ede8" }}>
                              <span style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#666", display: "block", marginBottom: "0.35rem", fontFamily: "system-ui, sans-serif" }}>Definition</span>
                              {f.definition}
                            </div>
                            <div style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.75, fontStyle: "italic", borderLeft: `2px solid ${selectedEmotion.accent}55`, paddingLeft: "0.9rem" }}>
                              <span style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#666", display: "block", marginBottom: "0.35rem", fontStyle: "normal", fontFamily: "system-ui, sans-serif" }}>What it feels like</span>
                              {f.sample}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer style={{ background: "#ffffff", borderTop: "1px solid #e0ddd8", padding: "1.25rem 2rem", fontSize: "0.72rem", color: "#666", textAlign: "center", letterSpacing: "0.04em", fontFamily: "system-ui, sans-serif" }}>
        Based upon Jonice Webb's Childhood Emotional Neglect work found in{" "}
        <em style={{ color: "#555" }}>Running on Empty</em> (2012) and{" "}
        <em style={{ color: "#555" }}>Running on Empty No More</em> (2017)
      </footer>
    </div>
  );
}
