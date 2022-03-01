const axios = require('axios');
const fetch = require('node-fetch');
const ori =
  'query FPADataQuery($advertId: String!, $numberOfImages: Int, $searchOptions: SearchOptions, $postcode: String) {\n  search {\n    advert(advertId: $advertId, searchOptions: $searchOptions) {\n      id\n      stockItemId\n      isAuction\n      hoursUsed\n      serviceHistory\n      title\n      excludePreviousOwners\n      advertisedLocations\n      motExpiry\n      heading {\n        title\n        subtitle\n        __typename\n      }\n      attentionGrabber\n      rrp\n      price\n      priceCurrency\n      priceExcludingFees\n      suppliedPrice\n      suppliedPriceExcludingFees\n      priceOnApplication\n      plusVatIndicated\n      saving\n      noAdminFees\n      adminFee\n      adminFeeInfoDescription\n      dateOfRegistration\n      homeDeliveryRegionCodes\n      deliversToMyPostcode\n      capabilities {\n        guaranteedPartEx {\n          enabled\n          __typename\n        }\n        marketExtensionHomeDelivery {\n          enabled\n          __typename\n        }\n        marketExtensionClickAndCollect {\n          enabled\n          __typename\n        }\n        marketExtensionCentrallyHeld {\n          enabled\n          __typename\n        }\n        sellerPromise {\n          enabled\n          __typename\n        }\n        __typename\n      }\n      collectionLocations {\n        locations {\n          ...CollectionLocationData\n          __typename\n        }\n        __typename\n      }\n      registration\n      generation {\n        generationId\n        name\n        review {\n          ownerReviewsSummary {\n            aggregatedRating\n            countOfReviews\n            __typename\n          }\n          expertReviewSummary {\n            rating\n            reviewUrl\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      hasShowroomProductCode\n      isPartExAvailable\n      isPremium\n      isFinanceAvailable\n      isFinanceFullApplicationAvailable\n      financeProvider\n      financeDefaults {\n        term\n        mileage\n        depositAmount\n        __typename\n      }\n      retailerId\n      hasClickAndCollect\n      privateAdvertiser {\n        contact {\n          protectedNumber\n          email\n          __typename\n        }\n        location {\n          town\n          county\n          postcode\n          __typename\n        }\n        tola\n        __typename\n      }\n      advertiserSegment\n      dealer {\n        ...DealerData\n        __typename\n      }\n      video {\n        url\n        preview\n        __typename\n      }\n      spin {\n        url\n        preview\n        __typename\n      }\n      imageList(limit: $numberOfImages) {\n        nextCursor\n        size\n        images {\n          url\n          templated\n          autotraderAllocated\n          __typename\n        }\n        __typename\n      }\n      priceIndicatorRating\n      priceIndicatorRatingLabel\n      priceDeviation\n      mileageDeviation\n      advertText\n      mileage {\n        mileage\n        unit\n        __typename\n      }\n      plate\n      year\n      vehicleCheckId\n      vehicleCheckStatus\n      vehicleCheckSummary {\n        type\n        title\n        performed\n        writeOffCategory\n        checks {\n          key\n          failed\n          advisory\n          critical\n          warning\n          __typename\n        }\n        __typename\n      }\n      sellerName\n      sellerType\n      sellerProducts\n      sellerLocation\n      sellerLocationDistance {\n        unit\n        value\n        __typename\n      }\n      sellerContact {\n        phoneNumberOne\n        phoneNumberTwo\n        protectedNumber\n        byEmail\n        __typename\n      }\n      description\n      colour\n      manufacturerApproved\n      insuranceWriteOffCategory\n      owners\n      vehicleCondition {\n        tyreCondition\n        interiorCondition\n        bodyCondition\n        __typename\n      }\n      specification {\n        operatingType\n        emissionClass\n        co2Emissions {\n          co2Emission\n          unit\n          __typename\n        }\n        topSpeed {\n          topSpeed\n          __typename\n        }\n        minimumKerbWeight {\n          weight\n          unit\n          __typename\n        }\n        endLayout\n        trailerAxleNumber\n        bedroomLayout\n        grossVehicleWeight {\n          weight\n          unit\n          __typename\n        }\n        capacityWeight {\n          weight\n          unit\n          __typename\n        }\n        liftingCapacity {\n          weight\n          unit\n          __typename\n        }\n        operatingWidth {\n          width\n          unit\n          __typename\n        }\n        maxReach {\n          length\n          unit\n          __typename\n        }\n        wheelbase\n        berth\n        bedrooms\n        engine {\n          power {\n            enginePower\n            unit\n            __typename\n          }\n          sizeLitres\n          sizeCC\n          manufacturerEngineSize\n          __typename\n        }\n        exteriorWidth {\n          width\n          unit\n          __typename\n        }\n        exteriorLength {\n          length\n          unit\n          __typename\n        }\n        exteriorHeight {\n          height\n          unit\n          __typename\n        }\n        capacityWidth {\n          width\n          unit\n          __typename\n        }\n        capacityLength {\n          length\n          unit\n          __typename\n        }\n        capacityHeight {\n          height\n          unit\n          __typename\n        }\n        seats\n        axleConfig\n        ulezCompliant\n        doors\n        bodyType\n        cabType\n        rawBodyType\n        fuel\n        transmission\n        style\n        subStyle\n        make\n        model\n        trim\n        vehicleCategory\n        optionalFeatures {\n          description\n          category\n          __typename\n        }\n        standardFeatures {\n          description\n          category\n          __typename\n        }\n        driverPosition\n        battery {\n          capacity {\n            capacity\n            unit\n            __typename\n          }\n          usableCapacity {\n            capacity\n            unit\n            __typename\n          }\n          range {\n            range\n            unit\n            __typename\n          }\n          charging {\n            quickChargeTime\n            chargeTime\n            __typename\n          }\n          __typename\n        }\n        techData {\n          co2Emissions\n          fuelConsumptionCombined\n          fuelConsumptionExtraUrban\n          fuelConsumptionUrban\n          insuranceGroup\n          minimumKerbWeight\n          zeroToSixtyMph\n          zeroToSixtyTwoMph\n          cylinders\n          valves\n          enginePower\n          topSpeed\n          engineTorque\n          vehicleHeight\n          vehicleLength\n          vehicleWidth\n          wheelbase\n          fuelTankCapacity\n          grossVehicleWeight\n          luggageCapacitySeatsDown\n          bootspaceSeatsUp\n          minimumKerbWeight\n          vehicleWidthInclMirrors\n          maxLoadingWeight\n          standardFeatures {\n            description\n            category\n            __typename\n          }\n          __typename\n        }\n        annualTax {\n          standardRate\n          __typename\n        }\n        oemDrivetrain\n        bikeLicenceType\n        derivative\n        derivativeId\n        __typename\n      }\n      stockType\n      versionNumber\n      tradeLifecycleStatus\n      condition\n      finance {\n        monthlyPayment\n        representativeApr\n        __typename\n      }\n      locationArea(postcode: $postcode) {\n        code\n        region\n        areaOfInterest {\n          postCode\n          manufacturerCodes\n          __typename\n        }\n        __typename\n      }\n      reservation {\n        status\n        eligibility\n        feeCurrency\n        feeInFractionalUnits\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment DealerData on Dealer {\n  dealerId\n  distance\n  stockLevels {\n    atStockCounts {\n      car\n      van\n      __typename\n    }\n    __typename\n  }\n  assignedNumber {\n    number\n    __typename\n  }\n  awards {\n    isWinner2018\n    isWinner2019\n    isWinner2020\n    isWinner2021\n    isFinalist2018\n    isFinalist2019\n    isFinalist2020\n    isFinalist2021\n    isHighlyRated2018\n    isHighlyRated2019\n    isHighlyRated2020\n    isHighlyRated2021\n    __typename\n  }\n  branding {\n    accreditations {\n      name\n      __typename\n    }\n    brands {\n      name\n      imageUrl\n      __typename\n    }\n    __typename\n  }\n  capabilities {\n    instantMessagingChat {\n      enabled\n      provider\n      __typename\n    }\n    instantMessagingText {\n      enabled\n      provider\n      overrideSmsNumber\n      __typename\n    }\n    __typename\n  }\n  reviews {\n    numberOfReviews\n    overallReviewRating\n    __typename\n  }\n  location {\n    addressOne\n    addressTwo\n    town\n    county\n    postcode\n    latLong\n    __typename\n  }\n  marketing {\n    profile\n    brandingBanner {\n      href\n      __typename\n    }\n    __typename\n  }\n  media {\n    email\n    dealerWebsite {\n      href\n      __typename\n    }\n    phoneNumber1\n    phoneNumber2\n    protectedNumber\n    __typename\n  }\n  name\n  servicesOffered {\n    sellerPromise {\n      monthlyWarranty\n      minMOTAndService\n      daysMoneyBackGuarantee\n      moneyBackRemoteOnly\n      __typename\n    }\n    services\n    products\n    safeSelling {\n      bulletPoints\n      paragraphs\n      __typename\n    }\n    homeDelivery {\n      bulletPoints\n      paragraphs\n      deliveryCostPerMile\n      deliveryCostFlatFee\n      freeDeliveryRadiusInMiles\n      __typename\n    }\n    videoWalkAround {\n      bulletPoints\n      paragraphs\n      __typename\n    }\n    clickAndCollect {\n      bulletPoints\n      paragraphs\n      __typename\n    }\n    buyOnline {\n      bulletPoints\n      paragraphs\n      __typename\n    }\n    nccApproved\n    isHomeDeliveryProductEnabled\n    isPartExAvailable\n    hasSafeSelling\n    hasHomeDelivery\n    hasVideoWalkAround\n    additionalLinks {\n      title\n      href\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment CollectionLocationData on CollectionLocation {\n  id\n  dealerId\n  name\n  town\n  postcode\n  distance\n  geoCoordinate {\n    latitude\n    longitude\n    __typename\n  }\n  badges {\n    type\n    label\n    __typename\n  }\n  __typename\n}\n';
const q = `
"query FPADataQuery($advertId: String!, $numberOfImages: Int, $searchOptions: SearchOptions, $postcode: String) {
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
    suppliedPrice
    suppliedPriceExcludingFees
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
"`;
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
  let q2 = `query FPADataQuery($advertId: String!, $searchOptions: SearchOptions) 
  {
    search {

         advert(advertId: $advertId, searchOptions: $searchOptions) {

          id
          serviceHistory
          title
          excludePreviousOwners
          motExpiry


          heading {
                title
                subtitle
              }


          attentionGrabber
          price
          priceCurrency
          registration

          capabilities {
            guaranteedPartEx {
              enabled
              }
            }

          isPartExAvailable

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
            grossVehicleWeight {
                  weight
                  unit
                  }
            
            
            
            
            engine {
                  power {
                  enginePower
                  unit
                        }
            sizeLitres
            sizeCC
            manufacturerEngineSize
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
                        // adding this techdata query breaks the response for unknown reason!!
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

      }}}`;
  const reqbody = {
    query: q2,
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

      console.log(body.data);
    } catch (e) {
      console.log({ errorInfoData: e });
      return { errorInfo: 'invalid url' };
    }
  };
  getDataFromAutotraderServer(advertID);
};

module.exports = getAutodata;
