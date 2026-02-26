/*!
 * Copyright 2024, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ReactElement, useState, useEffect, useMemo } from "react";
import { BlockAttributes } from "widget-sdk";
import { getEmailPerformanceData, getSentEmailsData } from "./api";
import { RecipientInteraction, SentEmail } from "./types";
import { FaCaretRight, FaCaretLeft, FaFileCsv } from "react-icons/fa";
import { getScopedWidgetStyles } from "./styles";

// --- HELPERS (Keep toInputDateTimeString, createSafeNow, formatDisplayDateTime) ---

const toInputDateTimeString = (date: Date): string => {
  const pad = (num: number) => num.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const createSafeNow = (): Date => {
  const now = new Date();
  now.setSeconds(now.getSeconds() - 10);
  return now;
};

const formatDisplayDateTime = (isoString: string): string => {
  return new Date(isoString).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

// --- COMPONENT PROPS --- //

export interface AnalyticsEmailOpenViewerProps extends BlockAttributes {
  emailid?: string;
  domain?: string;
  allemailsview?: boolean;
  emaillistlimit?: number;
  defaultemailpagesize?: number;
  defaultrecipientpagesize?: number;
  enablecsvdownload?: boolean;
}

// ... Keep InitialsAvatar, PlaceholderThumbnailIcon, RecipientRow ...

export const AnalyticsEmailOpenViewer = ({
  emailid,
  domain = "app.staffbase.com",
  allemailsview = true,
  emaillistlimit = 100,
  defaultemailpagesize = 5,
  defaultrecipientpagesize = 5,
  enablecsvdownload = false,
}: AnalyticsEmailOpenViewerProps): ReactElement => {
  const WIDGET_SCOPE_CLASS = "individual-email-widget";

  const [currentView, setCurrentView] = useState<"list" | "detail">(
    allemailsview ? "list" : "detail",
  );
  const [selectedEmailId, setSelectedEmailId] = useState<string | undefined>(
    allemailsview ? undefined : emailid,
  );
  const [allEmails, setAllEmails] = useState<SentEmail[]>([]);
  const [recipientData, setRecipientData] = useState<
    RecipientInteraction[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recipientSearchTerm, setRecipientSearchTerm] = useState("");
  const [emailListPage, setEmailListPage] = useState(0);
  const [recipientPage, setRecipientPage] = useState(0);
  const [emailsPerPage, setEmailsPerPage] = useState(defaultemailpagesize);
  const [recipientsPerPage, setRecipientsPerPage] = useState(
    defaultrecipientpagesize,
  );
  const [untilDate, setUntilDate] = useState(createSafeNow);
  const [sinceDate, setSinceDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d;
  });
  const [detailUntilDate, setDetailUntilDate] = useState(createSafeNow);
  const [detailSinceDate, setDetailSinceDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d;
  });
  const [emailStats, setEmailStats] = useState<{
    totalRecipients: number;
    totalOpens: number;
    uniqueOpens: number;
  } | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: "recipient" | "status" | null;
    direction: "ascending" | "descending" | "original";
  }>({ key: null, direction: "original" });

  useEffect(() => {
    setCurrentView(allemailsview ? "list" : "detail");
    setSelectedEmailId(allemailsview ? undefined : emailid);
  }, [allemailsview, emailid]);

  useEffect(() => {
    const fetchAllEmails = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getSentEmailsData(domain, emaillistlimit);
        setAllEmails(result);
      } catch (err) {
        setError("Failed to fetch sent emails.");
      } finally {
        setLoading(false);
      }
    };

    const fetchRecipientData = async (
      id: string,
      since: string,
      until: string,
    ) => {
      setLoading(true);
      setError(null);
      setRecipientData(null);
      setRecipientPage(0);
      try {
        const result = await getEmailPerformanceData(id, domain, since, until);
        setRecipientData(result);
      } catch (err) {
        setError("Failed to fetch analytics data.");
      } finally {
        setLoading(false);
      }
    };

    if (currentView === "list" && allemailsview) fetchAllEmails();
    else if (currentView === "detail" && selectedEmailId)
      fetchRecipientData(
        selectedEmailId,
        detailSinceDate.toISOString(),
        detailUntilDate.toISOString(),
      );
    else setLoading(false);
  }, [
    domain,
    currentView,
    selectedEmailId,
    emaillistlimit,
    allemailsview,
    detailSinceDate,
    detailUntilDate,
  ]);

  // ... Rest of component remains same ...
};
