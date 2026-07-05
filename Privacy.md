# Privacy Policy for Slink Collector

**Last Updated:** July 5, 2026

This privacy policy governs your use of the Chrome Extension "Slink Collector" (the "Extension"). We take your privacy seriously and are committed to protecting it through compliance with this policy.

---

## 1. Information Collection and Transmission
The Extension is designed to help users collect URLs and related web information through user-initiated actions (clicking the extension icon or using designated keyboard shortcuts). 

- **User-Initiated Submission:** The Extension only collects and transmits data when you actively interact with the popup form and click the submit button. 
- **Remote API Transmission:** The data collected via the form (such as URLs, titles, or custom form inputs) is transmitted directly and securely via HTTPS to your specified remote API server. 
- **No Background Collection:** The Extension does NOT automatically collect, log, or track your browsing history or personal data in the background.

## 2. Permission Usage Explanation
In compliance with the Google Chrome Web Store Developer Program Policies, here is a detailed explanation of why the Extension requires specific permissions:

- **`storage`:** Used strictly to save user configurations locally within your browser (such as API endpoints, authentication keys, or local preferences). This data never leaves your device unless part of an intentional submission.
- **`scripting`:** Used to retrieve the current tab's content (such as the active URL and page title) to pre-fill the form for the user, ensuring a seamless user experience.
- **`host_permissions` (`http://*/*`, `https://*/*`):** Required to allow the Extension to interact with the active browser tabs from which you wish to collect URLs, and to communicate with your user-defined remote API server.

## 3. Data Storage and Retention
- **Local Storage:** All configuration settings are stored locally on your device via the Chrome Storage API. 
- **No Central Server Logging:** We (the developers of Slink Collector) do not operate a centralized server to harvest, log, or store your data. All data transmitted goes exclusively to the remote API server configured by you.

## 4. Third-Party Sharing and Commercialization
- **No Data Sale:** We do not sell, trade, rent, or otherwise commercialize your personal data or browsing information to any third parties.
- **No Ad Networks / Tracking:** The Extension does not contain any third-party analytics, advertisements, or tracking scripts.

## 5. Security
We care about safeguarding the confidentiality of your information. All communications between the Extension and your remote API endpoints should be conducted over secure HTTPS connections to prevent unauthorized interception.

## 6. Changes to This Privacy Policy
We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

## 7. Contact Us
If you have any questions or suggestions about this Privacy Policy, please contact us at:
- **Email:** cao7113+wbs@gmail.com