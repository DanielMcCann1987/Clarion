// src/screens/AnalysisDetail.jsx
import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AnalysisDetail() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Analysis Detail</Text>

      {/* 1. Surface Structure */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Surface Structure</Text>
        <Text style={styles.bodyText}>
          “I’m choosing clarity over the old nicotine story.” — example quote.
        </Text>
      </View>

      {/* 2. Milton Model Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Milton Model Breakdown</Text>
        <View style={styles.tableRow}>
          <Text style={styles.pattern}>Cause & Effect:</Text>
          <Text style={styles.explanation}>
            “Nicotine makes me feel calm” interpreted as direct causality.
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.pattern}>Generalisation:</Text>
          <Text style={styles.explanation}>
            “All cravings are weakness” turned into a sweeping rule.
          </Text>
        </View>
        {/* Add more pattern rows as needed */}
      </View>

      {/* 3. Deep Structure */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Deep Structure</Text>
        <Text style={styles.bodyText}>
          Underneath the words is a desire for control and avoidance of discomfort.
        </Text>
      </View>

      {/* 4. Implied Beliefs & Inner Shifts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Implied Beliefs & Inner Shifts</Text>
        <Text style={styles.badgeOld}>Old: Addiction equals comfort</Text>
        <Text style={styles.badgeShift}>Shift: Awareness brings real relief</Text>
      </View>

      {/* 5. Reframe */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reframe</Text>
        <View style={styles.reframeBox}>
          <Text style={styles.reframeText}>
            “I choose clarity over the illusion; discomfort is information, not failure.”
          </Text>
        </View>
      </View>

      {/* 6. What They’re Really Saying */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What They’re Really Saying</Text>
        <Text style={styles.bodyText}>
          “I’m reclaiming my nervous system and replacing stories with truth.”
        </Text>
      </View>

      {/* 7. Optional Extensions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Extensions</Text>
        <TouchableOpacity style={styles.extensionButton}>
          <Text style={styles.extensionText}>View Self-Hypnosis Script</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.extensionButton}>
          <Text style={styles.extensionText}>View Contract Statement</Text>
        </TouchableOpacity>
      </View>

      {/* Footer actions */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>Save to Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>Mark Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>New Entry from Insight</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#0f111a',
    flexGrow: 1,
  },
  heading: {
    color: '#f5f5fa',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    color: '#7c4dff',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  bodyText: {
    color: '#f5f5fa',
    fontSize: 16,
  },
  tableRow: {
    marginBottom: 8,
  },
  pattern: {
    color: '#22d3ee',
    fontWeight: '600',
  },
  explanation: {
    color: '#f5f5fa',
    marginTop: 2,
  },
  badgeOld: {
    backgroundColor: '#333',
    color: '#ccc',
    padding: 6,
    borderRadius: 6,
    marginBottom: 4,
  },
  badgeShift: {
    backgroundColor: '#7c4dff',
    color: '#fff',
    padding: 6,
    borderRadius: 6,
    marginBottom: 4,
  },
  reframeBox: {
    backgroundColor: '#282b44',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#7c4dff',
  },
  reframeText: {
    color: '#f5f5fa',
    fontSize: 15,
  },
  extensionButton: {
    padding: 10,
    backgroundColor: '#1f2233',
    borderRadius: 6,
    marginTop: 6,
  },
  extensionText: {
    color: '#22d3ee',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
    justifyContent: 'space-between',
  },
  footerButton: {
    backgroundColor: '#222644',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 6,
    flexGrow: 1,
    minWidth: '45%',
  },
  footerText: {
    color: '#f5f5fa',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
});
