export default {
    name: 'compactQuiz',
    title: 'Quiz Section',
    type: 'object',
    fields: [
      {
        name: 'eyebrow',
        title: 'Eyebrow (Small Header)',
        type: 'string',
        initialValue: 'Testi oma süsteemi'
      },
      {
        name: 'title',
        title: 'Section Title',
        type: 'string',
      },
      {
        name: 'questions',
        title: 'Questions',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'question', title: 'Question Text', type: 'string' },
              {
                name: 'options',
                title: 'Answers',
                type: 'array',
                of: [
                  {
                    type: 'object',
                    fields: [
                      { name: 'text', title: 'Answer Text', type: 'string' },
                      { name: 'points', title: 'Points', type: 'number', description: 'Usually 1-5' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'results',
        title: 'Result Thresholds',
        description: 'Define messages based on total score',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'minScore', title: 'Min Score', type: 'number' },
              { name: 'title', title: 'Result Title', type: 'string' },
              { name: 'description', title: 'Result Description', type: 'text' },
              {
                name: 'ctaLink',
                title: 'Programmi link (valikuline)',
                type: 'string',
                description: 'Kui tühi, suunab "Vaata programmi" nupp vaikimisi /koolitus lehele.',
              },
            ]
          }
        ]
      }
    ]
  }