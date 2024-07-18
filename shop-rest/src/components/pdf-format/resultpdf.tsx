import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 8,
  },
  title: {
    fontSize: 10,
    marginBottom: 20,
    marginTop: 5,
  },
  label: {
    fontSize: 11,
    marginTop: 3,
    marginLeft: 1,
  },
  value: {
    fontSize: 11,
    color: 'gray',
    marginLeft: 10,
  },
  table: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    borderTopColor: 'black',
    borderTopWidth: 0.5,
  },
  tableCell: {
    width: '12.5%',
    padding: 5,
    borderRightColor: 'black',
    borderRightWidth: 0.5,
    borderLeftColor: 'black',
    borderLeftWidth: 0.5,
  },
  tableCellHead: {
    width: '12.5%',
    padding: 5,
    backgroundColor: 'black',
    color:'white',
    borderRightColor: 'white',
    borderRightWidth: 0.5,
    // borderLeftColor: 'white',
    // borderLeftWidth: 0.5,
    fontSize:9,
    
  },
});

const ResultPdf = ({ data, attemptedCount, correctCount, incorrectCount ,total_time_taken, memoizedExamAttempts , getAnswerStatus , currentPage , entriesPerPage ,getOptionLabel , timeConverter}) => {
  // Function to calculate total time
  const calculateTotalTime = (sections) => {
    console.log('sections time', sections)
    return sections.reduce((total, section) => total + timeStringToSeconds(section.time), 0);
  };

  // Function to convert time string to seconds (if not already provided)
  const timeStringToSeconds = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const totalTime = calculateTotalTime(total_time_taken);

  const formattedTotalTime = formatTotalTime(totalTime);

  function formatTotalTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const paddedSeconds = secs < 10 ? `0${secs}` : secs;

    // Include hours in the string only if it's greater than 0
    return hours > 0 
           ? `${hours}:${paddedMinutes}:${paddedSeconds}` 
           : `${paddedMinutes}:${paddedSeconds}`;
}

  return (  
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src="/boy.png" style={{width:'110px' , height:'40px'}}  />
      <Text style={styles.title}>Marksheet</Text>
      <View>
        <Text style={styles.label}>Name: <Text style={styles.value}>{data?.name}</Text></Text>
        <Text style={styles.label}>attemptedCount: <Text style={styles.value}>{attemptedCount}</Text></Text>
        <Text style={styles.label}>correctCount: <Text style={styles.value}>{correctCount}</Text></Text>
        <Text style={styles.label}>incorrectCount: <Text style={styles.value}>{incorrectCount}</Text></Text>
         {/* Section-wise time */}
         {total_time_taken.map((section, index) => (
            <Text key={index} style={styles.label}>
              {section.sectionName} Time: <Text style={styles.value}>{section.time}</Text>
            </Text>
          ))}

          {/* Total time */}
          <Text style={styles.label}>
            Total Time: <Text style={styles.value}>{formattedTotalTime}</Text>
          </Text>
        <Text style={styles.label}>Score: <Text style={styles.value}>{data?.score}</Text></Text>
        
      </View>
      <View style={{ marginTop: 20 }}>
        <View style={styles.table}>
          <Text style={styles.tableCellHead}>Question No</Text>
          <Text style={styles.tableCellHead}>Section</Text>
          <Text style={styles.tableCellHead}>Sub Section</Text>
          <Text style={styles.tableCellHead}>Question Type</Text>
          <Text style={styles.tableCellHead}>Your Ans</Text>
          <Text style={styles.tableCellHead}>Correct Ans</Text>
          <Text style={styles.tableCellHead}>Time Spent</Text>
          <Text style={styles.tableCellHead}>Status</Text>
        </View>

        {memoizedExamAttempts &&
          memoizedExamAttempts
            .filter(
              (question) =>
                !(question?.answer_text === null && question?.option_id === 0)
            )
            .map((questionAttempt, index) => {
              const status =
                questionAttempt.status === 'N/A'
                  ? 'N/A'
                  : getAnswerStatus(questionAttempt);

              return (
                <View
                  key={index}
                  style={[
                    styles.table,
                    {
                      backgroundColor:
                        questionAttempt.status === 'N/A'
                          ? 'lightgray'
                          : 'white',
                    },
                  ]}
                >
                  <Text style={styles.tableCell}>
                    {(currentPage - 1) * entriesPerPage + index + 1}
                  </Text>
                  <Text style={styles.tableCell}>
                    {questionAttempt?.question?.section?.name}
                  </Text>
                  <Text style={styles.tableCell}>
                    {questionAttempt?.question_subSection}
                  </Text>
                  <Text style={styles.tableCell}>
                    {questionAttempt?.question?.question_type?.type}
                  </Text>
                  <Text style={styles.tableCell}>
                    {questionAttempt.status === 'N/A'
                      ? 'N/A'
                      : questionAttempt.answer_text ||
                        questionAttempt.selected_options
                          .map((opt) =>
                            getOptionLabel(
                              questionAttempt.question.options,
                              opt.id
                            )
                          )
                          .join(', ')}
                  </Text>
                  <Text style={styles.tableCell}>
                    {questionAttempt?.question.correct_options?.length
                      ? questionAttempt?.question.correct_options
                          .map((opt) =>
                            getOptionLabel(
                              questionAttempt?.question?.options,
                              opt.id
                            )
                          )
                          .join(', ')
                      : typeof questionAttempt?.question.correct_answer ===
                        'string'
                      ? Object.values(
                          JSON.parse(questionAttempt?.question.correct_answer)
                        ).join(', ')
                      : Object.values(
                          questionAttempt?.question.correct_answer || {}
                        ).join(', ')}
                  </Text>
                  <Text style={styles.tableCell}>
                    {questionAttempt.timeSpent === 'N/A'
                      ? 'N/A'
                      : timeConverter(questionAttempt?.timeSpent)}
                  </Text>
                  <Text style={styles.tableCell}>
                    {status === 'Correct' ? (
                      <Text style={{ color: 'green' }}>Correct</Text>
                    ) : status === 'Partially Correct' ? (
                      <Text style={{ color: 'yellow' }}>Partially Correct</Text>
                    ) : status === 'Incorrect' ? (
                      <Text style={{ color: 'red' }}>Incorrect</Text>
                    ) : (
                      'N/A'
                    )}
                  </Text>
                </View>
              );
            })}
      </View>
    </Page>
  </Document>
);
          }

export default ResultPdf;
