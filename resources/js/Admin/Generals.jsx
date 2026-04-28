import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import BaseAdminto from '../Components/Adminto/Base';
import GeneralsRest from '../Actions/Admin/GeneralsRest';
import GalleryRest from '../Actions/Admin/GalleryRest'; 
import Tippy from '@tippyjs/react';
import CreateReactScript from '../Utils/CreateReactScript';
import { createRoot } from 'react-dom/client';
import QuillFormGroup from '../Components/Adminto/form/QuillFormGroup';
import TextareaFormGroup from '../Components/Adminto/form/TextareaFormGroup';
import Global from '../Utils/Global';
import InputFormGroup from '../Components/Adminto/form/InputFormGroup';
import SelectFormGroup from '../Components/Adminto/form/SelectFormGroup';

const generalsRest = new GeneralsRest();
const galleryRest = new GalleryRest();

const Generals = ({ generals }) => {
  const location = generals.find(x => x.correlative == 'location')?.description ?? '0,0';

  const [formData, setFormData] = useState({
    phones: generals.find(x => x.correlative == 'phone_contact')?.description?.split(',')?.map(x => x.trim()) ?? [''],
    emails: generals.find(x => x.correlative == 'email_contact')?.description?.split(',')?.map(x => x.trim()) ?? [''],
    address: generals.find(x => x.correlative == 'address')?.description ?? '',
    district: generals.find(x => x.correlative == 'district')?.description ?? '',
    province: generals.find(x => x.correlative == 'province')?.description ?? '',
    country: generals.find(x => x.correlative == 'country')?.description ?? '',
    lat: generals.find(x => x.correlative == 'lat')?.description ?? '',
    long: generals.find(x => x.correlative == 'long')?.description ?? '',
    openingHours: generals.find(x => x.correlative == 'opening_hours')?.description ?? '',
    supportPhone: generals.find(x => x.correlative == 'support_phone')?.description ?? '',
    supportEmail: generals.find(x => x.correlative == 'support_email')?.description ?? '',
    privacyPolicy: generals.find(x => x.correlative == 'privacy_policy')?.description ?? '',
    termsConditions: generals.find(x => x.correlative == 'terms_conditions')?.description ?? '',
    seoTitle: generals.find(x => x.correlative == 'seo_title')?.description ?? '',
    seoDescription: generals.find(x => x.correlative == 'seo_description')?.description ?? '',
    seoKeywords: generals.find(x => x.correlative == 'seo_keywords')?.description ?? '',
    
    // Transferencias
    checkout_transfer: generals.find((x) => x.correlative == "checkout_transfer")?.description ?? "false",
    transfer_accounts: (() => {
      const data = generals.find((x) => x.correlative == "transfer_accounts")?.description;
      try {
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    })(),

    // Culqi
    checkout_culqi: generals.find((x) => x.correlative == "checkout_culqi")?.description ?? "false",
    checkout_culqi_name: generals.find((x) => x.correlative == "checkout_culqi_name")?.description ?? "",
    checkout_culqi_public_key: generals.find((x) => x.correlative == "checkout_culqi_public_key")?.description ?? "",
    checkout_culqi_private_key: generals.find((x) => x.correlative == "checkout_culqi_private_key")?.description ?? "",

    // Píxeles de seguimiento
    facebookPixel: generals.find(x => x.correlative == 'facebook_pixel')?.description ?? '',
    googleAnalytics: generals.find(x => x.correlative == 'google_analytics')?.description ?? '',
    gtmContainer: generals.find(x => x.correlative == 'gtm_container')?.description ?? '',
    tiktokPixel: generals.find(x => x.correlative == 'tiktok_pixel')?.description ?? '',
    metaPixel: generals.find(x => x.correlative == 'meta_pixel')?.description ?? '',
    microsoftClarity: generals.find(x => x.correlative == 'microsoft_clarity')?.description ?? '',
    location: {
      lat: Number(location.split(',').map(x => x.trim())[0]),
      lng: Number(location.split(',').map(x => x.trim())[1])
    }
  });

  const [activeTab, setActiveTab] = useState('policies');

  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    const list = [...formData[field]];
    list[index] = value;
    setFormData(prevState => ({
      ...prevState,
      [field]: list
    }));
  };

  const handleAddField = (field) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: [...prevState[field], '']
    }));
  };

  const handleRemoveField = (index, field) => {
    const list = [...formData[field]];
    list.splice(index, 1);
    setFormData(prevState => ({
      ...prevState,
      [field]: list
    }));
  };

  const handleMapClick = (event) => {
    setFormData(prevState => ({
      ...prevState,
      location: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await generalsRest.save([
        { correlative: 'phone_contact', name: 'Teléfono de contacto', description: formData.phones.join(',') },
        { correlative: 'email_contact', name: 'Correo de contacto', description: formData.emails.join(',') },
        { correlative: 'address', name: 'Dirección', description: formData.address },
        { correlative: 'district', name: 'Distrito', description: formData.district },
        { correlative: 'province', name: 'Provincia', description: formData.province },
        { correlative: 'country', name: 'País', description: formData.country },
        { correlative: 'lat', name: 'Latitud', description: formData.lat },
        { correlative: 'long', name: 'Longitud', description: formData.long },
        { correlative: 'opening_hours', name: 'Horarios de atención', description: formData.openingHours },
        { correlative: 'support_phone', name: 'Número de soporte', description: formData.supportPhone },
        { correlative: 'support_email', name: 'Correo de soporte', description: formData.supportEmail },
        { correlative: 'privacy_policy', name: 'Política de privacidad', description: formData.privacyPolicy },
        { correlative: 'terms_conditions', name: 'Términos y condiciones', description: formData.termsConditions },
        { correlative: 'seo_title', name: 'Titulo - SEO', description: formData.seoTitle },
        { correlative: 'seo_description', name: 'Descripcion - SEO', description: formData.seoDescription },
        { correlative: 'seo_keywords', name: 'Palabras clave - SEO', description: formData.seoKeywords },
        
        { correlative: 'checkout_transfer', name: 'Habilitar Transferencia', description: formData.checkout_transfer || "false" },
        { correlative: 'transfer_accounts', name: 'Cuentas Bancarias para Transferencia', description: JSON.stringify(formData.transfer_accounts) },
        
        { correlative: 'checkout_culqi', name: 'Habilitar Culqi', description: formData.checkout_culqi || "false" },
        { correlative: 'checkout_culqi_name', name: 'Nombre Culqi', description: formData.checkout_culqi_name },
        { correlative: 'checkout_culqi_public_key', name: 'Llave Pública Culqi', description: formData.checkout_culqi_public_key },
        { correlative: 'checkout_culqi_private_key', name: 'Llave Privada Culqi', description: formData.checkout_culqi_private_key },
        
        { correlative: 'facebook_pixel', name: 'Facebook Pixel ID', description: formData.facebookPixel },
        { correlative: 'google_analytics', name: 'Google Analytics ID', description: formData.googleAnalytics },
        { correlative: 'gtm_container', name: 'Google Tag Manager ID', description: formData.gtmContainer },
        { correlative: 'tiktok_pixel', name: 'TikTok Pixel ID', description: formData.tiktokPixel },
        { correlative: 'meta_pixel', name: 'Meta Pixel ID', description: formData.metaPixel },
        { correlative: 'microsoft_clarity', name: 'Microsoft Clarity ID', description: formData.microsoftClarity },
        { correlative: 'location', name: 'Ubicación', description: `${formData.location.lat},${formData.location.lng}` }
      ]);
      alert('Datos guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert('Error al guardar los datos');
    }
  };

  const seo_keywords = (generals.find(x => x.correlative == 'seo_keywords')?.description ?? '').split(',').map(x => x.trim()).filter(Boolean)

  useEffect(() => {
    $('#cbo-keywords option').prop('selected', true).trigger('change')
  }, [null])

  return (
    <div className="card">
      <form className='card-body' onSubmit={handleSubmit}>
        <ul className="nav nav-tabs" id="contactTabs" role="tablist">
          <li className="nav-item" role="presentation"> 
            <button className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => setActiveTab('contact')} type="button" role="tab">
              Información de Contacto
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={`nav-link ${activeTab === 'policies' ? 'active' : ''}`} onClick={() => setActiveTab('policies')} type="button" role="tab">
              Políticas y Términos
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={`nav-link ${activeTab === 'seo' ? 'active' : ''}`} onClick={() => setActiveTab('seo')} type="button" role="tab">
              SEO (Metatags)
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={`nav-link ${activeTab === 'tracking' ? 'active' : ''}`} onClick={() => setActiveTab('tracking')} type="button" role="tab">
              Píxeles de Seguimiento
            </button>
          </li>
          <li className="nav-item" role="presentation" hidden> 
            <button className={`nav-link ${activeTab === 'location' ? 'active' : ''}`} onClick={() => setActiveTab('location')} type="button" role="tab">
              Ubicación
            </button>
          </li>
          <li className="nav-item" role="presentation"> 
            <button className={`nav-link ${activeTab === 'transfer' ? 'active' : ''}`} onClick={() => setActiveTab('transfer')} type="button" role="tab">
              Pagos por Transferencia
            </button>
          </li>
          <li className="nav-item" role="presentation"> 
            <button className={`nav-link ${activeTab === 'culqi' ? 'active' : ''}`} onClick={() => setActiveTab('culqi')} type="button" role="tab">
              Pasarela Culqi
            </button>
          </li>
        </ul>

        <div className="tab-content" id="contactTabsContent">
          
          <div className={`tab-pane fade ${activeTab === 'contact' ? 'show active' : ''}`} role="tabpanel">
              <div className="row">
                <div className="col-md-6" >
                  {formData.phones.map((phone, index) => (
                    <div key={`phone-${index}`} className="mb-3">
                      <label htmlFor={`phone-${index}`} className="form-label">Teléfono {index + 1}</label>
                      <div className="input-group">
                        <input
                          type="tel"
                          className="form-control"
                          id={`phone-${index}`}
                          value={phone}
                          onChange={(e) => handleInputChange(e, index, 'phones')}
                        />
                        <button type="button" className="btn btn-outline-danger" onClick={() => handleRemoveField(index, 'phones')}>
                          <i className='fa fa-trash'></i>
                        </button>
                      </div>
                    </div>
                  ))}
                  <button type="button" className="btn btn-outline-primary" onClick={() => handleAddField('phones')}>Agregar teléfono</button>
                </div>
                <div className="col-md-6" hidden>
                  {formData.emails.map((email, index) => (
                    <div key={`email-${index}`} className="mb-3">
                      <label htmlFor={`email-${index}`} className="form-label">Correo {index + 1}</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          id={`email-${index}`}
                          value={email}
                          onChange={(e) => handleInputChange(e, index, 'emails')}
                        />
                        <button type="button" className="btn btn-outline-danger" onClick={() => handleRemoveField(index, 'emails')}>
                          <i className='fa fa-trash'></i>
                        </button>
                      </div>
                    </div>
                  ))}
                  <button type="button" className="btn btn-outline-primary" onClick={() => handleAddField('emails')}>Agregar correo</button>
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-md-3">
                  <label htmlFor="address" className="form-label">Dirección</label>
                  <textarea className="form-control" id="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required></textarea>
                </div>
                <div className="mb-3 col-md-3">
                  <label htmlFor="district" className="form-label">Distrito</label>
                  <textarea className="form-control" id="district" value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })}></textarea>
                </div>
                <div className="mb-3 col-md-3">
                  <label htmlFor="province" className="form-label">Provincia</label>
                  <textarea className="form-control" id="province" value={formData.province} onChange={(e) => setFormData({ ...formData, province: e.target.value })}></textarea>
                </div>
                <div className="mb-3 col-md-3">
                  <label htmlFor="country" className="form-label">Pais</label>
                  <textarea className="form-control" id="country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })}></textarea>
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="lat" className="form-label">Latitud</label>
                  <textarea className="form-control" id="lat" value={formData.lat} onChange={(e) => setFormData({ ...formData, lat: e.target.value })} required></textarea>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="long" className="form-label">Longitud</label>
                  <textarea className="form-control" id="long" value={formData.long} onChange={(e) => setFormData({ ...formData, long: e.target.value })} required></textarea>
                </div>
              </div>  

              <div className="mb-3">
                <TextareaFormGroup label='Horarios de atencion' onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })} value={formData.openingHours} required />
              </div>

              <div className="mb-3">
                <label htmlFor="supportPhone" className="form-label">Número de whatsapp</label>
                <input type="tel" className="form-control" id="supportPhone" value={formData.supportPhone} onChange={(e) => setFormData({ ...formData, supportPhone: e.target.value })} required />
              </div>

              <div className="mb-3">
                <label htmlFor="supportEmail" className="form-label">Correo de contacto</label>
                <input type="email" className="form-control" id="supportEmail" value={formData.supportEmail} onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })} required />
              </div>
          </div>

          <div className={`tab-pane fade ${activeTab === 'policies' ? 'show active' : ''}`} role="tabpanel">
            <div className="mb-3">
              <QuillFormGroup label='Política de privacidad' value={formData.privacyPolicy} onChange={(value) => setFormData({ ...formData, privacyPolicy: value })} />
            </div>
            <div className="mb-3">
              <QuillFormGroup label='Términos y condiciones' value={formData.termsConditions} onChange={(value) => setFormData({ ...formData, termsConditions: value })} />
            </div>
          </div>

          <div className={`tab-pane fade ${activeTab === 'seo' ? 'show active' : ''}`} role="tabpanel">
            <InputFormGroup label='Titulo - SEO' value={formData.seoTitle ?? ''} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} />
            <TextareaFormGroup label='Descripcion - SEO' value={formData.seoDescription ?? ''} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} />
            <SelectFormGroup id='cbo-keywords' label='Palabras clave - SEO' tags multiple onChange={e => setFormData({ ...formData, seoKeywords: [...$(e.target).val()].join(', ') })} >
              {
                seo_keywords.map((keyword, index) => {
                  return <option key={index} value={keyword}>{keyword}</option>
                })
              }
            </SelectFormGroup>
          </div>

          <div className={`tab-pane fade ${activeTab === 'tracking' ? 'show active' : ''}`} role="tabpanel">
              <div className="row">
              <div className="col-md-6">
                <h5 className="mb-3">Redes Sociales y Marketing</h5>
                <InputFormGroup 
                  label='Facebook Pixel ID' 
                  value={formData.facebookPixel ?? ''} 
                  onChange={(e) => setFormData({ ...formData, facebookPixel: e.target.value })}
                  placeholder="Ej: 123456789012345"
                  help="ID del píxel de Facebook para seguimiento de conversiones"
                />
                <InputFormGroup 
                  label='Meta Pixel ID' 
                  value={formData.metaPixel ?? ''} 
                  onChange={(e) => setFormData({ ...formData, metaPixel: e.target.value })}
                  placeholder="Ej: 123456789012345"
                  help="ID del píxel de Meta (nuevo Facebook Pixel)"
                />
                <InputFormGroup 
                  label='TikTok Pixel ID' 
                  value={formData.tiktokPixel ?? ''} 
                  onChange={(e) => setFormData({ ...formData, tiktokPixel: e.target.value })}
                  placeholder="Ej: C9ABCD1234567890"
                  help="ID del píxel de TikTok para seguimiento de eventos"
                />
              </div>
              <div className="col-md-6">
                <h5 className="mb-3">Analytics y Medición</h5>
                <InputFormGroup 
                  label='Google Analytics ID' 
                  value={formData.googleAnalytics ?? ''} 
                  onChange={(e) => setFormData({ ...formData, googleAnalytics: e.target.value })}
                  placeholder="Ej: G-XXXXXXXXXX o UA-XXXXXXXXX-X"
                  help="ID de Google Analytics (GA4 o Universal Analytics)"
                />
                <InputFormGroup 
                  label='Google Tag Manager ID' 
                  value={formData.gtmContainer ?? ''} 
                  onChange={(e) => setFormData({ ...formData, gtmContainer: e.target.value })}
                  placeholder="Ej: GTM-XXXXXXX"
                  help="ID del contenedor de Google Tag Manager"
                />
                <InputFormGroup 
                  label='Microsoft Clarity ID' 
                  value={formData.microsoftClarity ?? ''} 
                  onChange={(e) => setFormData({ ...formData, microsoftClarity: e.target.value })}
                  placeholder="Ej: abcdefghij"
                  help="ID de Microsoft Clarity para análisis de comportamiento"
                />
              </div>
            </div>
            <div className="alert alert-info mt-3">
              <strong>Nota:</strong> Los píxeles y códigos de seguimiento se integrarán automáticamente en todas las páginas del sitio web cuando se configuren aquí.
            </div>
          </div>

          <div className={`tab-pane fade ${activeTab === 'location' ? 'show active' : ''}`} role="tabpanel">
            <LoadScript googleMapsApiKey={Global.GMAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={formData.location}
                zoom={10}
                onClick={handleMapClick}
              >
                <Marker position={formData.location} />
              </GoogleMap>
            </LoadScript>
            <small className="form-text text-muted">
              Haz clic en el mapa para seleccionar la ubicación.
            </small>
          </div>

          <div className={`tab-pane fade ${activeTab === 'transfer' ? 'show active' : ''}`} role="tabpanel">
            <div className="mb-4">
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="checkout-transfer"
                  checked={formData.checkout_transfer === 'true'}
                  onChange={(e) => setFormData({ ...formData, checkout_transfer: String(e.target.checked) })}
                />
                <label className="form-check-label fw-bold" htmlFor="checkout-transfer">
                  Habilitar pago por transferencia
                </label>
                <small className="text-muted d-block mt-1">Al habilitar esta opción, los clientes podrán seleccionar transferencia bancaria al pagar.</small>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Cuentas Bancarias</h5>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setFormData({
                    ...formData,
                    transfer_accounts: [
                      ...formData.transfer_accounts,
                      { image: null, cc: "", cci: "", name: "", description: "" }
                    ]
                  });
                }}
              >
                <i className="fa fa-plus me-1"></i> Agregar Cuenta
              </button>
            </div>

            {formData.transfer_accounts.map((account, index) => (
              <div key={index} className="mb-4 p-4 border rounded shadow-sm bg-light">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0 text-primary">
                    <i className="fas fa-university me-2"></i> Cuenta Bancaria #{index + 1}
                  </h6>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      if (window.confirm("¿Estás seguro de eliminar esta cuenta?")) {
                        const accounts = [...formData.transfer_accounts];
                        accounts.splice(index, 1);
                        setFormData({ ...formData, transfer_accounts: accounts });
                      }
                    }}
                  >
                    <i className="fa fa-trash me-1"></i> Eliminar
                  </button>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Imagen / Logo del Banco</label>
                    {account.image ? (
                      <div className="position-relative">
                        <Tippy content="Eliminar Imagen">
                          <button
                            type="button"
                            className="position-absolute btn btn-xs btn-danger"
                            style={{ top: "5px", right: "5px", zIndex: 10 }}
                            onClick={() => {
                              const accounts = [...formData.transfer_accounts];
                              accounts[index].image = null;
                              setFormData({ ...formData, transfer_accounts: accounts });
                            }}
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </Tippy>
                        <img
                          src={`/api/generals/media/${account.image}`} 
                          className="img-thumbnail w-100"
                          onError={(e) =>(e.target.src = "/api/cover/thumbnail/null")}
                          style={{ maxHeight: "150px", objectFit: "contain" }}
                          alt="Banco"
                          
                        />
                      </div>
                    ) : (
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          
                          e.target.value = null; // Reset input
                          
                          const request = new FormData();
                          request.append("image", file);

                          try {
                            const result = await galleryRest.save(request);
                            if (result && result.file) {
                              const accounts = [...formData.transfer_accounts];
                              accounts[index].image = result.file; 
                              setFormData({ ...formData, transfer_accounts: accounts });
                            }
                          } catch (error) {
                            console.error("Error subiendo la imagen", error);
                            alert("Hubo un error al subir la imagen");
                          }
                        }}
                      />
                    )}
                  </div>

                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Nombre del Banco / Titular</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ej: BCP - Mi Empresa S.A.C"
                          value={account.name}
                          onChange={(e) => {
                            const accounts = [...formData.transfer_accounts];
                            accounts[index].name = e.target.value;
                            setFormData({ ...formData, transfer_accounts: accounts });
                          }}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Número de Cuenta (CC)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ej: 191-xxxxxxx-x-xx"
                          value={account.cc}
                          onChange={(e) => {
                            const accounts = [...formData.transfer_accounts];
                            accounts[index].cc = e.target.value;
                            setFormData({ ...formData, transfer_accounts: accounts });
                          }}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Código Interbancario (CCI)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ej: 002191xxxxxxx"
                          value={account.cci}
                          onChange={(e) => {
                            const accounts = [...formData.transfer_accounts];
                            accounts[index].cci = e.target.value;
                            setFormData({ ...formData, transfer_accounts: accounts });
                          }}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Descripción o Notas</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ej: Cuenta corriente en Soles"
                          value={account.description}
                          onChange={(e) => {
                            const accounts = [...formData.transfer_accounts];
                            accounts[index].description = e.target.value;
                            setFormData({ ...formData, transfer_accounts: accounts });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {formData.transfer_accounts.length === 0 && (
              <div className="alert alert-warning text-center">
                Aún no has agregado ninguna cuenta bancaria. Haz clic en "Agregar Cuenta".
              </div>
            )}
          </div>

          <div className={`tab-pane fade ${activeTab === 'culqi' ? 'show active' : ''}`} role="tabpanel">
            <div className="mb-4">
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="checkout-culqi"
                  checked={formData.checkout_culqi === 'true'}
                  onChange={(e) => setFormData({ ...formData, checkout_culqi: String(e.target.checked) })}
                />
                <label className="form-check-label fw-bold" htmlFor="checkout-culqi">
                  Habilitar pago con Culqi (Tarjetas, Yape)
                </label>
                <small className="text-muted d-block mt-1">Al habilitar esta opción, los clientes podrán usar la pasarela de pagos de Culqi.</small>
              </div>
            </div>

            {/* {formData.checkout_culqi === 'true' && (
              <div className="bg-light p-4 rounded-xl border border-gray-200">
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Título a mostrar en el Checkout</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Ej: Pago Seguro con Tarjeta o Yape" 
                      value={formData.checkout_culqi_name} 
                      onChange={(e) => setFormData({ ...formData, checkout_culqi_name: e.target.value })} 
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Llave Pública (Public Key)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="pk_live_..." 
                      value={formData.checkout_culqi_public_key} 
                      onChange={(e) => setFormData({ ...formData, checkout_culqi_public_key: e.target.value })} 
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Llave Privada (Private Key)</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      placeholder="sk_live_..." 
                      value={formData.checkout_culqi_private_key} 
                      onChange={(e) => setFormData({ ...formData, checkout_culqi_private_key: e.target.value })} 
                    />
                  </div>
                </div>

                <div className="alert alert-warning mt-3 mb-0">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  <strong>Nota:</strong> Para pruebas usa llaves que empiecen con <code>pk_test</code> y <code>sk_test</code>. Para recibir dinero real usa llaves que empiecen con <code>pk_live</code> y <code>sk_live</code>.
                </div>
              </div>
            )} */}
          </div>

        </div>

        <button type="submit" className="btn btn-primary mt-3">
          <i className='fa fa-save me-2'></i> Guardar
        </button>
      </form>
    </div>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<BaseAdminto {...properties} title="Datos Generales">
    <Generals {...properties} />
  </BaseAdminto>);
});