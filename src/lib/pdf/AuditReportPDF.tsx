import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 30,
    borderBottom: '2px solid #0055E5',
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    color: '#0f172a',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#0055E5',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  userInfo: {
    fontSize: 12,
    color: '#334155',
    marginBottom: 5,
  },
  questionBox: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 6,
  },
  questionNumber: {
    fontSize: 10,
    color: '#94a3b8',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  questionText: {
    fontSize: 12,
    color: '#0f172a',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  answerText: {
    fontSize: 12,
    color: '#0055E5',
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTop: '1px solid #e2e8f0',
    fontSize: 10,
    color: '#94a3b8',
    textAlign: 'center',
  },
})

interface QuizAnswer {
  question: string
  selectedOption: string
}

interface AuditReportPDFProps {
  name: string
  email: string
  answers: QuizAnswer[]
}

export function AuditReportPDF({ name, email, answers }: AuditReportPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Tehase Tootmisauditi Raport</Text>
          <Text style={styles.subtitle}>OEE analuus ja optimeerimise ulevaade</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.userInfo}>Nimi: {name}</Text>
          <Text style={styles.userInfo}>E-post: {email}</Text>
          <Text style={styles.userInfo}>
            Kuupaev: {new Date().toLocaleDateString('et-EE')}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Teie vastused ja analuus</Text>
          {answers.map((ans, index) => (
            <View key={index} style={styles.questionBox}>
              <Text style={styles.questionNumber}>KUSIMUS {index + 1}</Text>
              <Text style={styles.questionText}>{ans.question}</Text>
              <Text style={styles.answerText}>{ans.selectedOption}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>See on automaatselt genereeritud raport teie tootmisauditi pohjal.</Text>
          <Text>Kusimuste korral votke uhendust meie meeskonnaga.</Text>
        </View>
      </Page>
    </Document>
  )
}
