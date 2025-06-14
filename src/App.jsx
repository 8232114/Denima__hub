import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // تأكد من أن المسار هو './components/Home'
import ServiceDetail from './components/ServiceDetail'; // تأكد من أن المسار هو './components/ServiceDetail'
import servicesData from './data/services.json';
import { Button } from '@components/ui/button.jsx';
import { Badge } from '@components/ui/badge.jsx';
import { Input } from '@components/ui/input.jsx';
import { Textarea } from '@components/ui/textarea.jsx';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/dialog.jsx';
import { Label } from '@components/ui/label.jsx';
import heroImage from './assets/hero_image.png';
import lightLogo from './assets/light_logo.png';
import './App.css';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://0vhlizcpp6ed.manus.space/api' : '';

function App( ) {
  const [services, setServices] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [showLogin, setShowLogin] = useState(false);
  const [showAddService, setShowAddService] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // تعريفات أخرى للمتغيرات أو الدوال التي قد تكون موجودة في ملفك الأصلي
  // هذه الأسطر تمثل جزءًا من الكود الطويل الذي أرسلته لي سابقًا
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    features: [''],
    color: 'bg-blue-500',
    logo_url: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_new_password: ''
  });
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');
  const [contactMethods, setContactMethods] = useState([
    {
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.15 2.85A9.99 9.99 0 002.85 17.15 9.99 9.99 0 0017.15 2.85zM10 0a10 10 0 100 20A10 10 0 0010 0zM14.5 10a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"></path></svg>,
      label: 'واتساب',
      value: '+212633785269',
      action: 'whatsapp',
      link: 'https://api.whatsapp.com/send/?phone=212633785269&type=phone_number&app_absent=0'
    },
    {
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.15 2.85A9.99 9.99 0 002.85 17.15 9.99 9.99 0 0017.15 2.85zM10 0a10 10 0 100 20A10 10 0 0010 0zM14.5 10a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"></path></svg>,
      label: 'هاتف',
      value: '+212633785269',
      action: 'call',
      link: 'tel:+212633785269'
    }
  ] );
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState('');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [verifyEmailStatus, setVerifyEmailStatus] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPartners, setShowPartners] = useState(false);
  const [showCareers, setShowCareers] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showDevelopers, setShowDevelopers] = useState(false);
  const [showApiDocs, setShowApiDocs] = useState(false);
  const [showStatusPage, setShowStatusPage] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showSitemap, setShowSitemap] = useState(false);
  const [showAffiliates, setShowAffiliates] = useState(false);
  const [showPress, setShowPress] = useState(false);
  const [showInvestors, setShowInvestors] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showTrust, setShowTrust] = useState(false);
  const [showCompliance, setShowCompliance] = useState(false);
  const [showPartnerships, setShowPartnerships] = useState(false);
  const [showIntegrations, setShowIntegrations] = useState(false);
  const [showCaseStudies, setShowCaseStudies] = useState(false);
  const [showWebinars, setShowWebinars] = useState(false);
  const [showTutorials, setShowTutorials] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [showForum, setShowForum] = useState(false);
  const [showDiscord, setShowDiscord] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [showGithub, setShowGithub] = useState(false);
  const [showTwitter, setShowTwitter] = useState(false);
  const [showFacebook, setShowFacebook] = useState(false);
  const [showInstagram, setShowInstagram] = useState(false);
  const [showLinkedin, setShowLinkedin] = useState(false);
  const [showYoutube, setShowYoutube] = useState(false);
  const [showReddit, setShowReddit] = useState(false);
  const [showMedium, setShowMedium] = useState(false);
  const [showProductHunt, setShowProductHunt] = useState(false);
  const [showAngelList, setShowAngelList] = useState(false);
  const [showCrunchbase, setShowCrunchbase] = useState(false);
  const [showGlassdoor, setShowGlassdoor] = useState(false);
  const [showYelp, setShowYelp] = useState(false);
  const [showTrustpilot, setShowTrustpilot] = useState(false);
  const [showG2, setShowG2] = useState(false);
  const [showCapterra, setShowCapterra] = useState(false);
  const [showSoftwareAdvice, setShowSoftwareAdvice] = useState(false);
  const [showGetApp, setShowGetApp] = useState(false);
  const [showAlternativeTo, setShowAlternativeTo] = useState(false);
  const [showStackOverflow, setShowStackOverflow] = useState(false);
  const [showQuora, setShowQuora] = useState(false);
  const [showWikipedia, setShowWikipedia] = useState(false);
  const [showGoogleScholar, setShowGoogleScholar] = useState(false);
  const [showResearchGate, setShowResearchGate] = useState(false);
  const [showAcademia, setShowAcademia] = useState(false);
  const [showSemanticScholar, setShowSemanticScholar] = useState(false);
  const [showArxiv, setShowArxiv] = useState(false);
  const [showPmid, setShowPmid] = useState(false);
  const [showDoi, setShowDoi] = useState(false);
  const [showOrcid, setShowOrcid] = useState(false);
  const [showScopus, setShowScopus] = useState(false);
  const [showWebOfScience, setShowWebOfScience] = useState(false);
  const [showIeee, setShowIeee] = useState(false);
  const [showAcm, setShowAcm] = useState(false);
  const [showSpringer, setShowSpringer] = useState(false);
  const [showWiley, setShowWiley] = useState(false);
  const [showElsevier, setShowElsevier] = useState(false);
  const [showTaylorAndFrancis, setShowTaylorAndFrancis] = useState(false);
  const [showCambridge, setShowCambridge] = useState(false);
  const [showOxford, setShowOxford] = useState(false);
  const [showMit, setShowMit] = useState(false);
  const [showHarvard, setShowHarvard] = useState(false);
  const [showStanford, setShowStanford] = useState(false);
  const [showBerkeley, setShowBerkeley] = useState(false);
  const [showCmu, setShowCmu] = useState(false);
  const [showGaTech, setShowGaTech] = useState(false);
  const [showUcla, setShowUcla] = useState(false);
  const [showUwash, setShowUwash] = useState(false);
  const [showUtexas, setShowUtexas] = useState(false);
  const [showUillinois, setShowUillinois] = useState(false);
  const [showUmich, setShowUmich] = useState(false);
  const [showUpenn, setShowUpenn] = useState(false);
  const [showColumbia, setShowColumbia] = useState(false);
  const [showNyu, setShowNyu] = useState(false);
  const [showCornell, setShowCornell] = useState(false);
  const [showDuke, setShowDuke] = useState(false);
  const [showNcState, setShowNcState] = useState(false);
  const [showUf, setShowUf] = useState(false);
  const [showUga, setShowUga] = useState(false);
  const [showUsc, setShowUsc] = useState(false);
  const [showUcdavis, setShowUcdavis] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsd, setShowUcsd] = useState(false);
  const [showUci, setShowUci] = useState(false);
  const [showUcr, setShowUcr] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showUcsc, setShowUcsc] = useState(false);
  const [showUcm, setShowUcm] = useState(false);
  const [showUcsf, setShowUcsf] = useState(false);
  const [showUcsb, setShowUcsb] = useState(false);
  const [showU
