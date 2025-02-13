import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const subjects = [
  {
    name: 'Mathematics',
    topics: [
      'Calculus', 'Linear Algebra', 'Probability', 'Statistics', 
      'Discrete Mathematics', 'Graph Theory', 'Set Theory', 'Number Theory'
    ]
  },
  {
    name: 'Digital Logic',
    topics: [
      'Boolean Algebra', 'Combinational Circuits', 'Sequential Circuits',
      'Logic Gates', 'Flip Flops', 'Counters', 'Registers', 'State Machines'
    ]
  },
  {
    name: 'Computer Organization',
    topics: [
      'CPU Architecture', 'Memory Systems', 'I/O Systems', 'Pipelining',
      'Cache Memory', 'Virtual Memory', 'RISC vs CISC', 'Assembly Language'
    ]
  },
  {
    name: 'Programming',
    topics: [
      'Data Structures', 'Algorithms', 'Object-Oriented Programming',
      'C Programming', 'Python', 'Java', 'Time Complexity', 'Space Complexity'
    ]
  },
  {
    name: 'Theory of Computation',
    topics: [
      'Automata Theory', 'Regular Languages', 'Context-Free Languages',
      'Turing Machines', 'Computability', 'Complexity Theory', 'Formal Languages',
      'Regular Expressions'
    ]
  }
];

const difficulties = ['Easy', 'Medium', 'Hard'];

const generateQuestionText = (subject, topic) => {
  const questionTemplates = [
    `Explain the concept of ${topic} in ${subject}.`,
    `Solve the following problem related to ${topic} in ${subject}.`,
    `Analyze the given scenario involving ${topic} in ${subject}.`,
    `Compare and contrast different approaches in ${topic} for ${subject}.`,
    `Implement a solution for the following ${topic} problem in ${subject}.`
  ];
  return questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
};

const generateDescription = (topic) => {
  const descriptions = [
    `This question tests your understanding of fundamental concepts in ${topic}.`,
    `Apply your knowledge of ${topic} to solve a practical problem.`,
    `Demonstrate your problem-solving skills in ${topic} through this challenge.`,
    `This question focuses on advanced concepts and applications in ${topic}.`,
    `Show your analytical thinking abilities in ${topic} with this problem.`
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const generateTitle = (topic) => {
  const titles = [
    `${topic} Fundamentals`,
    `Advanced ${topic} Concepts`,
    `${topic} Problem Solving`,
    `${topic} Analysis`,
    `${topic} Application`
  ];
  return titles[Math.floor(Math.random() * titles.length)];
};

export const initializeQuestions = async () => {
  try {
    console.log('Starting question initialization...');
    
    // Check if questions already exist
    const questionsRef = collection(db, 'problems');
    const existingQuestions = await getDocs(questionsRef);
    
    if (!existingQuestions.empty) {
      console.log(`Found ${existingQuestions.size} existing questions, skipping initialization`);
      return;
    }

    console.log('No existing questions found, starting generation...');
    const questions = [];
    let questionId = 1;

    // Generate 200 questions per subject
    for (const subject of subjects) {
      console.log(`Generating questions for ${subject.name}...`);
      const questionsPerTopic = Math.floor(200 / subject.topics.length);
      const remainingQuestions = 200 % subject.topics.length;

      for (const topic of subject.topics) {
        // Calculate how many questions to generate for this topic
        let topicQuestions = questionsPerTopic;
        if (subject.topics.indexOf(topic) < remainingQuestions) {
          topicQuestions += 1;
        }

        console.log(`Generating ${topicQuestions} questions for topic: ${topic}`);
        for (let i = 0; i < topicQuestions; i++) {
          const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
          
          const question = {
            id: `Q${questionId.toString().padStart(4, '0')}`,
            subject: subject.name,
            topic: topic,
            title: generateTitle(topic),
            description: generateDescription(topic),
            text: generateQuestionText(subject.name, topic),
            difficulty: difficulty,
            createdAt: new Date().toISOString()
          };

          questions.push(question);
          questionId++;
        }
      }
      console.log(`Generated ${questions.length} questions so far...`);
    }

    console.log(`Generated total of ${questions.length} questions, starting upload...`);

    // Upload questions to Firebase in batches
    const batchSize = 50;
    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = questions.slice(i, i + batchSize);
      console.log(`Uploading batch ${Math.floor(i/batchSize) + 1} of ${Math.ceil(questions.length/batchSize)}...`);
      await Promise.all(batch.map(question => addDoc(questionsRef, question)));
      console.log(`Uploaded questions ${i + 1} to ${Math.min(i + batchSize, questions.length)}`);
    }

    console.log('Successfully initialized all questions!');
  } catch (error) {
    console.error('Error initializing questions:', error);
    throw error;
  }
};

// Function to get questions for a specific subject
export const getQuestionsBySubject = async (subject) => {
  try {
    const questionsRef = collection(db, 'problems');
    const q = query(questionsRef, where('subject', '==', subject));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};
