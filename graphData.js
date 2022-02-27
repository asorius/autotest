const axios = require('axios');
const fetch = require('node-fetch');
const query = `query FPADataQuery($advertId: String!, $numberOfImages: Int, $searchOptions: SearchOptions, $postcode: String) {
  search {
    advert(advertId: $advertId, searchOptions: $searchOptions) {
      id
      serviceHistory
      title
      motExpiry
      heading {
        title
        subtitle
    
    }
    price
    priceCurrency
    priceOnApplication
    plusVatIndicated
    saving
    noAdminFees
    adminFee
    adminFeeInfoDescription
    dateOfRegistration
    homeDeliveryRegionCodes
    deliversToMyPostcode
    capabilities {
        guaranteedPartEx {
          enabled
      
      }
      marketExtensionHomeDelivery {
          enabled
      
      }
      marketExtensionClickAndCollect {
          enabled
      
      }
      marketExtensionCentrallyHeld {
          enabled
      
      }
      sellerPromise {
          enabled
      
      }
  
    }
    collectionLocations {
        locations {
          ...CollectionLocationData
      
      }
  
    }
    registration
    generation {
        generationId
        name
        review {
          ownerReviewsSummary {
            aggregatedRating
            countOfReviews
        
        }
        expertReviewSummary {
            rating
            reviewUrl
        
        }
    
      }
  
    }
    hasShowroomProductCode
    isPartExAvailable
    isPremium
    isFinanceAvailable
    isFinanceFullApplicationAvailable
    financeProvider
    financeDefaults {
        term
        mileage
        depositAmount
    
    }
    retailerId
    hasClickAndCollect
    privateAdvertiser {
        contact {
          protectedNumber
          email
      
      }
      location {
          town
          county
          postcode
      
      }
      tola
  
    }
    advertiserSegment
    dealer {
        ...DealerData
    
    }
    video {
        url
        preview
    
    }
    spin {
        url
        preview
    
    }
    imageList(limit: $numberOfImages) {
        nextCursor
        size
        images {
          url
          templated
          autotraderAllocated
      
      }
  
    }
    priceIndicatorRating
    priceIndicatorRatingLabel
    priceDeviation
    mileageDeviation
    advertText
    mileage {
        mileage
        unit
    
    }
    plate
    year
    vehicleCheckId
    vehicleCheckStatus
    vehicleCheckSummary {
        type
        title
        performed
        writeOffCategory
        checks {
          key
          failed
          advisory
          critical
          warning
      
      }
  
    }
    sellerName
    sellerType
    sellerProducts
    sellerLocation
    sellerLocationDistance {
        unit
        value
    
    }
    sellerContact {
        phoneNumberOne
        phoneNumberTwo
        protectedNumber
        byEmail
    
    }
    description
    colour
    manufacturerApproved
    insuranceWriteOffCategory
    owners
    vehicleCondition {
        tyreCondition
        interiorCondition
        bodyCondition
    
    }
    specification {
        operatingType
        emissionClass
        co2Emissions {
          co2Emission
          unit
      
      }
      topSpeed {
          topSpeed
      
      }
      minimumKerbWeight {
          weight
          unit
      
      }
      endLayout
      trailerAxleNumber
      bedroomLayout
      grossVehicleWeight {
          weight
          unit
      
      }
      capacityWeight {
          weight
          unit
      
      }
      liftingCapacity {
          weight
          unit
      
      }
      operatingWidth {
          width
          unit
      
      }
      maxReach {
          length
          unit
      
      }
      wheelbase
      berth
      bedrooms
      engine {
          power {
            enginePower
            unit
        
        }
        sizeLitres
        sizeCC
        manufacturerEngineSize
    
      }
      exteriorWidth {
          width
          unit
      
      }
      exteriorLength {
          length
          unit
      
      }
      exteriorHeight {
          height
          unit
      
      }
      capacityWidth {
          width
          unit
      
      }
      capacityLength {
          length
          unit
      
      }
      capacityHeight {
          height
          unit
      
      }
      seats
      axleConfig
      ulezCompliant
      doors
      bodyType
      cabType
      rawBodyType
      fuel
      transmission
      style
      subStyle
      make
      model
      trim
      vehicleCategory
      optionalFeatures {
          description
          category
      
      }
      standardFeatures {
          description
          category
      
      }
      driverPosition
      battery {
          capacity {
            capacity
            unit
        
        }
        usableCapacity {
            capacity
            unit
        
        }
        range {
            range
            unit
        
        }
        charging {
            quickChargeTime
            chargeTime
        
        }
    
      }
      techData {
          co2Emissions
          fuelConsumptionCombined
          fuelConsumptionExtraUrban
          fuelConsumptionUrban
          insuranceGroup
          minimumKerbWeight
          zeroToSixtyMph
          zeroToSixtyTwoMph
          cylinders
          valves
          enginePower
          topSpeed
          engineTorque
          vehicleHeight
          vehicleLength
          vehicleWidth
          wheelbase
          fuelTankCapacity
          grossVehicleWeight
          luggageCapacitySeatsDown
          bootspaceSeatsUp
          minimumKerbWeight
          vehicleWidthInclMirrors
          maxLoadingWeight
          standardFeatures {
            description
            category
        
        }
    
      }
      annualTax {
          standardRate
      
      }
      oemDrivetrain
      bikeLicenceType
      derivative
      derivativeId
  
    }
    stockType
    versionNumber
    tradeLifecycleStatus
    condition
    finance {
        monthlyPayment
        representativeApr
    
    }
    locationArea(postcode: $postcode) {
        code
        region
        areaOfInterest {
          postCode
          manufacturerCodes
      
      }
  
    }
    reservation {
        status
        eligibility
        feeCurrency
        feeInFractionalUnits
    
    }

  }

}
}
fragment DealerData on Dealer {
  dealerId
  distance
  stockLevels {
    atStockCounts {
      car
      van
  
  }

}
assignedNumber {
    number

}
awards {
    isWinner2018
    isWinner2019
    isWinner2020
    isWinner2021
    isFinalist2018
    isFinalist2019
    isFinalist2020
    isFinalist2021
    isHighlyRated2018
    isHighlyRated2019
    isHighlyRated2020
    isHighlyRated2021

}
branding {
    accreditations {
      name
  
  }
  brands {
      name
      imageUrl
  
  }

}
capabilities {
    instantMessagingChat {
      enabled
      provider
  
  }
  instantMessagingText {
      enabled
      provider
      overrideSmsNumber
  
  }

}
reviews {
    numberOfReviews
    overallReviewRating

}
location {
    addressOne
    addressTwo
    town
    county
    postcode
    latLong

}
marketing {
    profile
    brandingBanner {
      href
  
  }

}
media {
    email
    dealerWebsite {
      href
  
  }
  phoneNumber1
  phoneNumber2
  protectedNumber

}
name
servicesOffered {
    sellerPromise {
      monthlyWarranty
      minMOTAndService
      daysMoneyBackGuarantee
      moneyBackRemoteOnly
  
  }
  services
  products
  safeSelling {
      bulletPoints
      paragraphs
  
  }
  homeDelivery {
      bulletPoints
      paragraphs
      deliveryCostPerMile
      deliveryCostFlatFee
      freeDeliveryRadiusInMiles
  
  }
  videoWalkAround {
      bulletPoints
      paragraphs
  
  }
  clickAndCollect {
      bulletPoints
      paragraphs
  
  }
  buyOnline {
      bulletPoints
      paragraphs
  
  }
  nccApproved
  isHomeDeliveryProductEnabled
  isPartExAvailable
  hasSafeSelling
  hasHomeDelivery
  hasVideoWalkAround
  additionalLinks {
      title
      href
  
  }

}
}
fragment CollectionLocationData on CollectionLocation {
  id
  dealerId
  name
  town
  postcode
  distance
  geoCoordinate {
    latitude
    longitude

}
badges {
    type
    label

}
}
`;
const getAutodataOld = async (link) => {
  //get the main link without user search/page info which is added by autotrader if copying from their search page
  //actualink includes advertisement id @ guid

  try {
    let advertID = link.substring(41, 56);
    //changing settings generates different structure links, check for that occasion too before returning an error
    if (!/^\d+$/.test(advertID)) {
      advertID = link.substring(47, 62);
    }
    const forGuid = await axios.get(link);
    const guID = forGuid.data
      .split('window.AT.correlationId =')[1]
      .substring(2, 38);
    const actualLink = `https://www.autotrader.co.uk/json/fpa/initial/${advertID}?guid=${guID}`;
    let { data } = await axios.get(actualLink);

    const { derivativeId } = data.vehicle;
    const { data: techs } = await axios.get(
      `https://www.autotrader.co.uk/json/taxonomy/technical-specification?derivative=${derivativeId}`
    );
    return { ...data, techSpecs: { ...techs } };
  } catch (e) {
    console.log({ errorInfoData: 'invalid url' });
    return { errorInfo: 'invalid url' };
  }
};
const getAutodata = async (link) => {
  //get the main link without user search/page info which is added by autotrader if copying from their search page
  //actualink includes advertisement id @ guid

  let advertID = link.split('details/')[1];
  const reqbody = {
    query: `query FPADataQuery($advertId: String!, $searchOptions: SearchOptions) {
      search {
           advert(advertId: $advertId, searchOptions: $searchOptions) {
            id
            stockItemId
            isAuction
            hoursUsed
            serviceHistory
            title
            excludePreviousOwners
            advertisedLocations
            motExpiry
            heading {
                  title
                  subtitle
                }
            attentionGrabber
            rrp
            price
            priceCurrency
            priceExcludingFees
            registration}}}`,
    variables: {
      advertId: advertID,
      numberOfImages: 100,
      searchOptions: {
        advertisingLocations: ['at_cars'],
        postcode: 'st163jg',
        collectionLocationOptions: {
          searchPostcode: 'st163jg',
        },
        channel: 'cars',
      },
      postcode: 'st163jg',
    },
  };
  const getDataFromAutotraderServer = async () => {
    try {
      const resp = await fetch(
        'https://www.autotrader.co.uk/at-graphql?opname=FPADataQuery',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
          },
          body: JSON.stringify(reqbody),
        }
      );
      const body = await resp.json();
      console.log(body.data.search.advert);
    } catch (e) {
      console.log({ errorInfoData: e });
      return { errorInfo: 'invalid url' };
    }
  };
  getDataFromAutotraderServer(advertID);
};

module.exports = getAutodata;
